module Lookbook
  class SseController < ActionController::Base
    include ActionController::Live

    def index
      if Engine.auto_refresh?
        response.headers["Cache-Control"] = "no-transform" # prevent compression
        response.headers["Content-Type"] = "text/event-stream"
        response.headers["Last-Modified"] = Time.now.httpdate

        response.headers["rack.hijack"] = proc do |stream|
          message_queue = Thread::Queue.new
          sse = SSE.new(stream, retry: 300, event: "open")

          trigger_background_loop(message_queue)

          Thread.new do
            loop do
              data = message_queue.pop
              sse.write(data, event: "message")
              Lookbook.logger.debug("events: sent update event to clients | #{data.inspect}")
            end
          rescue ClientDisconnected, Errno::EPIPE, Errno::ECONNRESET, IOError => err
            Lookbook.logger.debug("events: #{err}")
          ensure
            Lookbook.logger.debug("events: closing event stream")
            sse.close
            stream.close
          end
        end
      end

      head :ok
    end

    def ping
      render html: Engine.updated_at
    end

    private

    def trigger_background_loop(message_queue)
      Thread.new do
        last_update_event_sent = Engine.updated_at
        loop do
          if last_update_event_sent.before?(Engine.updated_at)
            message_queue.push({type: "update", updated_at: Engine.updated_at})
            last_update_event_sent = Engine.updated_at
          end
          sleep 0.1
        end
      end
    end
  end
end
