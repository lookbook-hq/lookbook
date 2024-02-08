require "rails"

module Lookbook
  MAIN_PID = Process.pid
  class Engine < Rails::Engine
    include Loggable

    isolate_namespace Lookbook

    config.before_configuration do |app|
      app.config.lookbook = Lookbook::Config.current
    end

    config.after_initialize do |app|
      options = app.config.lookbook

      if options.reload_on_change.nil?
        options.reload_on_change = !app.config.cache_classes && app.config.reload_classes_only_on_change
      end

      boot
    end

    class << self
      def boot
        @booted ||= begin
          info("Initializing Lookbook...")

          if watch_files?
            Reloaders.register(Previews.reloader)
            Reloaders.execute
          else
            Previews.load_all
          end

          info("Lookbook initialized#{" - watching filesystem for changes" if watch_files?}")
        end
      end

      def watch_files?
        config.lookbook.reload_on_change
      end
    end
  end
end
