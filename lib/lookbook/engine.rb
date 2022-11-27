require "view_component"
require "yard"

module Lookbook
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.autoload_paths << File.expand_path(root.join("app/components"))

    config.before_configuration do
      config.lookbook = Lookbook.config
    end

    initializer "lookbook.viewcomponent.config_sync" do
      opts.preview_paths += config.view_component.preview_paths
      opts.preview_controller ||= config.view_component.preview_controller

      if config.view_component.view_component_path.present?
        opts.components_path = config.view_component.view_component_path
      end
    end

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"],
        root: root.join("public").to_s
      )
    end

    config.after_initialize do
      reloaders.add(:previews, Engine.preview_watch_paths, opts.listen_extensions, &Engine.method(:load_previews))
      reloaders.add(:pages, Engine.page_watch_paths, opts.page_extensions, &Engine.method(:load_pages))
    end

    # The preview controller handles the rendering of individual previews.
    #
    # Lookbook injects some actions into whichever controller has been
    # specified by the user in order to render previews within the context of
    # the particular controller class instance so that any before_action/after_action
    # callbacks will be correctly processed.
    config.after_initialize do
      @preview_controller = opts.preview_controller.constantize
      @preview_controller.class_eval { include Lookbook::PreviewActions }
    end

    config.after_initialize do
      reloaders.execute
      Engine.run_hooks(:after_initialize)
    end

    def opts
      Lookbook.config
    end

    def parser
      @_parser ||= PreviewParser.new(opts.preview_paths, Engine.tags)
    end

    def reloaders
      @_reloaders ||= Reloaders.new
    end

    class << self
      attr_reader :preview_controller

      def app_name
        return @_app_name if @_app_name

        app_class = Rails.application.class
        name = app_class.respond_to?(:module_parent_name) ? app_class.module_parent_name : app_class.parent_name
        @_app_name ||= name.underscore
      end

      def mount_path
        routes.find_script_name({})
      end

      def mounted?
        mount_path.present?
      end

      def reloading?
        Rails.application.config.reload_classes_only_on_change
      end

      def auto_refresh?
        runtime_context.actioncable_installed? &&
          reloading? &&
          runtime_context.web? &&
          Reloaders.evented?
      end

      def websocket
        @_websocket ||= auto_refresh? ? Websocket.new(mount_path, logger: Lookbook.logger) : NullWebsocket.new
      end

      def runtime_context
        @_runtime_context ||= RuntimeContext.new(env: Rails.env)
      end

      def panels
        @_panels ||= PanelStore.init_from_config
      end

      def inputs
        @_inputs ||= InputStore.init_from_config
      end

      def tags
        @_tags ||= TagStore.init_from_config
      end

      def hooks
        @_hooks ||= HookStore.init_from_config
      end

      def run_hooks(event_name, *args)
        hooks.for_event(event_name).each do |hook|
          hook.call(Lookbook, *args)
        end
      end

      def component_paths
        @_component_paths ||= Array(PathUtils.to_absolute(opts.components_path))
      end

      def page_paths
        @_page_paths ||= PathUtils.normalize_paths(opts.page_paths)
      end

      def page_watch_paths
        page_paths
      end

      def preview_paths
        @_preview_paths ||= PathUtils.normalize_paths(opts.preview_paths)
      end

      def preview_watch_paths
        return @_preview_watch_paths if @_preview_watch_paths

        paths = [*opts.preview_paths, opts.components_path, *opts.listen_paths].uniq
        @_preview_watch_paths ||= PathUtils.normalize_paths(paths)
      end

      def pages
        @_pages ||= PageCollection.new
      end

      def previews
        @_previews ||= PreviewCollection.new
      end

      def load_previews(changes = nil)
        parser.parse do |code_objects|
          previews.load(code_objects.all(:class), changes)
        end
      end

      def load_pages(changes = nil)
        pages.load(Engine.page_paths, changes)
      end

      def notify_clients(changes = nil)
        return unless changes.present?

        websocket.broadcast(:reload)
        run_hooks(:after_change, changes.to_h)
      end

      def files_changed(modified, added, removed)
        changes = {modified: modified, added: added, removed: removed}
        reloaders.register_changes(changes)
        notify_clients(changes)
      end
    end

    at_exit do
      Engine.run_hooks(:before_exit)
    end
  end
end
