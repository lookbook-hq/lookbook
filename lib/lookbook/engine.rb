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

    config.to_prepare do
      ViewComponentConfigSync.call if Gem.loaded_specs.has_key?("view_component")

      preview_controller = Lookbook.config.preview_controller.constantize
      unless preview_controller.include?(Lookbook::PreviewControllerActions)
        preview_controller.include(Lookbook::PreviewControllerActions)
      end
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
        raise "Lookbook is already started!" if @started

        info("Starting Lookbook in #{Lookbook.env} mode...")

        if watch_files?
          Reloaders.register(Previews.reloader)
          Reloaders.register(Pages.reloader)
          Reloaders.execute
        else
          Previews.load
          Pages.load
        end

        @started = true

        info("Lookbook started#{" - watching filesystem for changes" if watch_files?}")
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

      def component_paths
        @component_paths ||= begin
          paths = [*config.lookbook.component_paths, *view_paths, host_app_path]
          Utils.normalize_paths(paths)
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
        @updated_at = DateTime.now
      end

      def updated_at
        @updated_at ||= DateTime.now
      end

      def enabled?
        config.lookbook.enabled
      end
    end
  end
end
