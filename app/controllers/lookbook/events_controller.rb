module Lookbook
  class EventsController < ActionController::Base
    PING_INTERVAL = 1

    include ActionController::Live

    def index
      response.headers["Cache-Control"] = "no-transform" # prevent compression
      response.headers["Content-Type"] = "text/event-stream"
      response.headers["Last-Modified"] = Time.now.httpdate

      response.headers["rack.hijack"] = proc do |stream|
        Thread.new do
          perform_task(stream)
        end
      end

      head :ok
    end

    protected

    def perform_task(stream)
      Thread.new do
        sse = SSE.new(stream, event: :update)

        last_update_event_sent = Engine.updated_at
        loop do
          sleep PING_INTERVAL

          Lookbook.logger.debug("Checking for changes…")

          if last_update_event_sent.before?(Engine.updated_at)
            last_update_event_sent = Engine.updated_at

            Lookbook.logger.debug("Sending update event (#{last_update_event_sent})")

            sse.write({updated_at: Engine.updated_at, type: :update}, event: :message)
          else
            sse.write({type: :ping}, event: :message)
          end
        end
      rescue ActionController::Live::ClientDisconnected, Errno::EPIPE, Errno::ECONNRESET, IOError
        Lookbook.logger.debug("Client disconnected")
        sse.close
      ensure
        stream.close
      end
    end
  end
end
