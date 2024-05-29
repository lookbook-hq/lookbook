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

    config.after_initialize do |app|
      ViewComponentConfigSync.call if Gem.loaded_specs.has_key?("view_component")

      preview_controller = Lookbook.config.preview_controller.constantize
      unless preview_controller.include?(Lookbook::PreviewControllerActions)
        preview_controller.include(Lookbook::PreviewControllerActions)
      end

      app.routes.prepend do
        get "#{Engine.mount_path}/render_scenario/:preview/:scenario",
          to: "#{Lookbook.config.preview_controller.sub(/Controller$/, "").underscore}#lookbook_render_scenario",
          as: :lookbook_render_scenario,
          internal: true
      end

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
          Previews.load
          Pages.load
        end

        @booted = true

        info("Lookbook initialized#{" - watching filesystem for changes" if watch_files?}")
      end

      def mount(mount_path = nil)
        config.lookbook.mount_path = mount_path unless mount_path.nil?

        Rails.application.routes.draw do
          mount Lookbook::Engine => Lookbook::Engine.mount_path
        end
      end

      def mount_path
        path = config.lookbook.mount_path || Lookbook::Config.defaults.mount_path
        "/#{Utils.strip_slashes(path)}"
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
    end
  end
end
