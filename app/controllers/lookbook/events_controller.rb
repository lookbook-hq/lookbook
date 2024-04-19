module Lookbook
  class EventsController < ActionController::Base
    include ActionController::Live
    include Loggable

    def index
      response.headers["Content-Type"] = "text/event-stream"
      response.headers["Last-Modified"] = Time.now.httpdate

      response.headers["rack.hijack"] = proc do |stream|
        Thread.new do
          sse = SSE.new(stream, retry: 300, event: "open")
          last_update_event_sent = Engine.updated_at

          loop do
            if last_update_event_sent.before?(Engine.updated_at)
              debug("events: sending update event to clients")
              sse.write({type: "update", updated_at: Engine.updated_at}, event: "event")
              last_update_event_sent = Engine.updated_at
            end
            sleep 0.5
          end
        rescue ClientDisconnected, Errno::EPIPE, IOError
          sse.close
        ensure
          sse.close
        end
      end

      head :ok
    end
  end
end
