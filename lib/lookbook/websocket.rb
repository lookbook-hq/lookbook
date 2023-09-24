module Lookbook
  class Websocket
    class << self
      def new(mount_path, **)
        require_relative "cable/cable"

        Cable.new(mount_path, **)
      rescue LoadError
        NullWebsocket.new
      end
    end
  end
end
