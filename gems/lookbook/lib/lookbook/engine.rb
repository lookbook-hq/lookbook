require "literal"
require "lookbook/concerns/loggable"

module Lookbook
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    include Loggable

    Collection.all.each do |collection|
      config.autoload_paths << collection.path
    end

    config.before_configuration do |app|
      app.config.lookbook = Config.current
    end

    config.before_initialize do |app|
      if FileWatcher.evented?
        # Patch EventedFileUpdateChecker to get real-time update notifications
        ActiveSupport::EventedFileUpdateChecker::Core.prepend UpdateCheckerPatch
      end

      # Inertia patches
      ActionDispatch::Request.include InertiaRequestPatch
      ActionDispatch::Routing::Mapper.include InertiaMapperPatch
    end

    initializer "lookbook.inertia.renderer" do |app|
      ActionController::Renderers.add :inertia do |component, options|
        Inertia::Renderer.new(
          component,
          self,
          request,
          response,
          method(:render),
          **options
        ).render
      end
    end

    initializer "lookbook.inertia.middleware" do |app|
      app.middleware.use Inertia::Middleware
    end

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"],
        root: root.join("dist").to_s
      )
    end

    initializer "lookbook.file_watchers" do |app|
      if Engine.enabled? && FileWatcher.watching?
        Rails.application.reloaders.push(*Engine.reloaders)

        debug("watching filesystem for changes")
      end
    end

    config.after_initialize do |app|
      if Engine.enabled?
        app.routes.prepend do
          get "lookbook/scenarios/:scenario/preview",
            to: "lookbook_scenario#preview",
            as: :lookbook_scenario_preview,
            internal: true

          get "lookbook/scenarios/:scenario/preview_source",
            to: "lookbook_scenario#preview_source",
            as: :lookbook_scenario_preview_source,
            internal: true

          get "lookbook/pages/:page/preview",
            to: "lookbook_page#preview",
            as: :lookbook_page_preview,
            internal: true

          get "lookbook/pages/:page/content",
            to: "lookbook_page#content",
            as: :lookbook_page_content,
            internal: true
        end

        info("Lookbook is running ✓")
      else
        warn("Lookbook is loaded but not enabled in this environment (#{Rails.env}).")
      end
    end

    class << self
      def reloaders
        @reloaders ||= Collection.map { _1.reloader }
      end

      def files_changed(**changeset)
        if changeset.values.flatten.any?
          reloaders.each do |reloader|
            reloader.execute_if_updated
          end
          @updated_at = DateTime.now
        end
      end

      def updated_at = @updated_at ||= DateTime.now

      def mount_path
        @mount_path ||= routes.find_script_name({})
      end

      def mounted? = mount_path.present?

      def enabled? = !!config.enabled

      protected delegate :config, to: Lookbook
    end
  end
end
