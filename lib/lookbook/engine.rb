require "rails"
require "action_mailer"
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
      sync_config
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
        notifications.clear
        @updated_at = Utils.current_timestamp_milliseconds
      end

      def updated_at
        @updated_at ||= Utils.current_timestamp_milliseconds
      end

      def sync_config
        if Gem::Specification.find_all_by_name("view_component").present?
          vc_config = Rails.application.config.view_component

          Lookbook.config.preview_paths += vc_config.preview_paths

          if vc_config.preview_controller != ViewComponent::Config.defaults.preview_controller && Lookbook.config.preview_controller == Lookbook::Config.defaults.preview_controller
            Lookbook.config.preview_controller = vc_config.preview_controller
          elsif Lookbook.config.preview_controller != Lookbook::Config.defaults.preview_controller
            vc_config.preview_controller = Lookbook.config.preview_controller
          end

          if Lookbook.config.preview_layout.nil? || vc_config.default_preview_layout.present?
            Lookbook.config.preview_layout = vc_config.default_preview_layout
          else
            vc_config.default_preview_layout = Lookbook.config.preview_layout
          end

          if vc_config.view_component_path.present?
            Lookbook.config.component_paths << vc_config.view_component_path
          end
        end
      end
    end
  end
end
