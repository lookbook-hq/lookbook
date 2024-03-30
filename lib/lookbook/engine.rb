require "rails"
require "yard"

module Lookbook
  class Engine < Rails::Engine
    include Loggable

    isolate_namespace Lookbook

    config.before_configuration do |app|
      app.config.lookbook = Lookbook::Config.current
    end

    config.before_initialize do |app|
      YARD::Parser::Ruby::RipperParser.prepend YardParserPatch
    end

    config.after_initialize do
      boot!
    end

    class << self
      def boot!
        raise "Lookbook is already booted!" if @booted

        info("Initializing Lookbook in #{Lookbook.env} mode...")

        if watch_files?
          Reloaders.register(Previews.reloader)
          Reloaders.register(Pages.reloader)
          Reloaders.execute
        else
          Previews.load_all
          Pages.load_all
        end

        @booted = true

        info("Lookbook initialized#{" - watching filesystem for changes" if watch_files?}")
      end

      def mount_path
        config.lookbook.mount_path || Lookbook::Config.defaults.mount_path
      end

      def view_paths
        @view_paths ||= begin
          # handle view path registry changes in Rails 7.1
          paths = if defined?(ActionView::PathRegistry)
            ActionView::PathRegistry.all_file_system_resolvers.map(&:path)
          else
            ActionView::ViewPaths.all_view_paths.flat_map(&paths)
          end
          Utils.normalize_paths(paths.map(&:to_s))
        end
      end

      def host_app_path
        Rails.application.root.join("app")
      end

      def notifications
        @notifications ||= Notifications.new
      end

      def watch_files?
        config.lookbook.reload_on_change
      end

      def files_updated!
        notifications.clear
        @updated_at = Utils.current_timestamp_milliseconds
      end

      def updated_at
        @updated_at ||= Utils.current_timestamp_milliseconds
      end
    end
  end
end
