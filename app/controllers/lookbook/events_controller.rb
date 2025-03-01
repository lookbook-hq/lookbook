module Lookbook
  class EventsController < ActionController::Base
    include ActionController::Live
    include Loggable

    def index
      response.headers["Cache-Control"] = "no-transform" # prevent compression
      response.headers["Content-Type"] = "text/event-stream"
      response.headers["Last-Modified"] = Time.now.httpdate

      response.headers["rack.hijack"] = proc do |stream|
        event_queue = Thread::Queue.new
        sse = SSE.new(stream, retry: 300, event: "open")

        trigger_background_loop(event_queue)

        Thread.new do
          loop do
            data = event_queue.pop
            sse.write(data, event: "event")
            debug("events: sent update event to clients | #{data.inspect}")
          end
        rescue ClientDisconnected, Errno::EPIPE, Errno::ECONNRESET, IOError => err
          debug("events: #{err}")
        ensure
          debug("events: closing event stream")
          sse.close
          stream.close
        end
      end

      head :ok
    end

    def ping
      render html: Engine.updated_at
    end

    private

    def trigger_background_loop(event_queue)
      Thread.new do
        last_update_event_sent = Engine.updated_at
        loop do
          if last_update_event_sent.before?(Engine.updated_at)
            event_queue.push({type: "update", updated_at: Engine.updated_at})
            last_update_event_sent = Engine.updated_at
          end
          sleep 0.5
        end
      end
    end
  end
end
