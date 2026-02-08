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
      if Engine.evented_file_watcher?
        # Patch EventedFileUpdateChecker to get real-time update notifications
        ActiveSupport::EventedFileUpdateChecker::Core.prepend(UpdateCheckerPatch)
      end
    end

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"],
        root: root.join("dist").to_s
      )
    end

    initializer "lookbook.file_watchers" do |app|
      if Engine.reloading?
        Rails.application.reloaders << Engine.reloader
      end
    end

    config.after_initialize do
      if Engine.enabled?
        info("Lookbook is running ✓")
      else
        debug("Lookbook is loaded but not enabled in this environment (#{Rails.env}).")
      end
    end

    class << self
      def files_changed(**changeset)
        changes = changeset.transform_values { |paths| paths.map { "\n→ #{_1}" } }

        debug("files: modified #{changes[:modified].join}") if changes[:modified].any?
        debug("files: added #{changes[:added].join}") if changes[:added].any?
        debug("files: removed #{changes[:removed].join}") if changes[:removed].any?

        reloader.execute_if_updated
        @updated_at = DateTime.now
      end

      def updated_at = @updated_at ||= DateTime.now

      def reloader
        @reloader ||= Reloader.new(Collection.watch_dirs) { Collection.each(&:load!) }
      end

      def evented_file_watcher?
        Gem.loaded_specs.has_key?("listen") && file_watcher == ActiveSupport::EventedFileUpdateChecker
      end

      def reloading?
        enabled? && Lookbook.config.reload_on_change
      end

      def enabled? = !!Lookbook.config.enabled

      def file_watcher = host_config.file_watcher

      protected def host_config = Rails.application.config
    end
  end
end
