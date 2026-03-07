require "literal"
require "lookbook"
require "lookbook/loggable"

module Lookbook::Rails
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    include Lookbook::Loggable

    config.before_configuration do |app|
      Lookbook::Config.merge(Engine.default_config)

      app.config.lookbook = Lookbook.config
    end

    config.before_initialize do |app|
      if FileWatcher.evented?
        # Patch EventedFileUpdateChecker to get real-time update notifications
        ActiveSupport::EventedFileUpdateChecker::Core.prepend UpdateCheckerPatch
      end

      ActionDispatch::Request.include InertiaRequestPatch
    end

    initializer "lookbook.set_autoload_paths", before: :set_autoload_paths do |app|
      collection_paths = Collection.map(&:path).map(&:to_s)

      paths = collection_paths - app.config.autoload_paths
      app.config.autoload_paths.concat(paths) if paths.any?
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
      pd app.config.lookbook.collections

      if Engine.enabled? && Lookbook::Rails::FileWatcher.watching?
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
      include Lookbook::Rails

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

      def default_config
        {
          project: {
            name: "Lookbook"
          },

          collections: [],

          scenarios: {
            default_layout: nil,
            controller: "LookbookScenarioController"
          },

          pages: {
            default_layout: "lookbook/pages",
            controller: "LookbookPageController"
          },

          enabled: Rails.env.local?,

          reload_on_change: nil
        }
      end
    end
  end
end
