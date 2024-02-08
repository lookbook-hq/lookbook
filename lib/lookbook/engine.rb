require "rails"

module Lookbook
  class Engine < Rails::Engine
    include Loggable

    isolate_namespace Lookbook

    config.before_configuration do
      config.lookbook = Lookbook::Config.current
    end

    config.after_initialize { boot }

    class << self
      def boot
        info("Lookbook booted")
      end

      def host_config
        Rails.application.config
      end

      def lookbook_config
        Lookbook::Config.current
      end
    end
  end
end
