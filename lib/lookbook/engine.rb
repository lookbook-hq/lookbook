require "rails"
require "lookbook/concerns/loggable"

module Lookbook
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    include Loggable

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"],
        root: root.join("dist").to_s
      )
    end

    config.before_configuration do |app|
      app.config.lookbook = Config.current
    end

    config.after_initialize do
      if Engine.enabled?
        start
      else
        info("Lookbook is loaded but not enabled in this environment (#{Rails.env}).")
      end
    end

    class << self
      def start
        raise "Lookbook has already been started" if @started

        @started = true

        info("Lookbook started in #{Lookbook.env} mode...")
      end

      def collections
        Collection.all
      end

      def enabled?
        config.lookbook.enabled
      end
    end
  end
end
