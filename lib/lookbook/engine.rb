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
      if Engine.listening?
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
        dirs = Collection.watch_dirs
        reloader = Engine.file_watcher.new([], dirs) {}

        Rails.application.reloaders << reloader

        if !Engine.listening? || !Engine.file_watcher.is_a?(ActiveSupport::EventedFileUpdateChecker)
          # Using non-evented FileUpdateChecker
          Rails.application.config.to_prepare do
            Collection.each { _1.load! }
          end
        end
      end
    end

    config.after_initialize do
      if Engine.enabled?
        info("Lookbook is ready ✓")
      else
        debug("Lookbook is loaded but not enabled in this environment (#{Rails.env}).")
      end
    end

    class << self
      def collections = Collection.all

      def files_changed(**changeset)
        changes = changeset.transform_values { |paths| paths.map { "\n→ #{_1}" } }

        debug("files: modified #{changes[:modified].join}") if changes[:modified].any?
        debug("files: added #{changes[:added].join}") if changes[:added].any?
        debug("files: removed #{changes[:removed].join}") if changes[:removed].any?

        changeset.values.inject(:+).each do |path|
          collections.find { _1.contains?(path) }&.load!
        end

        touch!
      end

      def touch! = @updated_at = DateTime.now

      def updated_at = @updated_at ||= touch!

      def listening?
        Gem.loaded_specs.has_key?("listen") && defined?(::Listen)
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
