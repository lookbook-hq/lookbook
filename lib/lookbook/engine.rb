require "literal"
require "lookbook/concerns/loggable"

module Lookbook
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    include Loggable

    config.lookbook = Config.current

    Collection.all.each do |collection|
      config.autoload_paths << collection.path
    end

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"],
        root: root.join("dist").to_s
      )
    end

    config.after_initialize do
      if config.lookbook.enabled
        boot
      else
        debug("Lookbook is loaded but not enabled in this environment (#{Rails.env}).")
      end
    end

    class << self
      def boot
        raise "Lookbook has already been booted" if @booted

        @booted = true

        info("Lookbook is ready ✓")
      end
    end
  end
end
