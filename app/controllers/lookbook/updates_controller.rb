module Lookbook
  class UpdatesController < ActionController::Base
    def index
      request.env["rack.hijack"].call
      stream = request.env["rack.hijack_io"]

      send_headers(stream)

      Thread.new do
        sse = ActionController::Live::SSE.new(stream, retry: 300, event: "open")
        last_notified = Engine.updated_at

        loop do
          if last_notified < Engine.updated_at

            sse.write({updated_at: Engine.updated_at}, event: "update")

            last_notified = Engine.updated_at
          end
          sleep 0.5
        end
      rescue ActionController::Live::ClientDisconnected, Errno::EPIPE
        sse.close
      ensure
        sse.close
      end

      head :ok
    end

    private

    def send_headers(stream)
      headers = [
        "HTTP/1.1 200 OK",
        "Content-Type: text/event-stream",
        "Last-Modified: #{Time.now.httpdate}"
      ]
      stream.write(headers.map { |header| header + "\r\n" }.join)
      stream.write("\r\n")
      stream.flush
    rescue
      stream.close
      raise
    end
  end
end
