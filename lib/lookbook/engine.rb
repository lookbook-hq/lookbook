require "view_component"
require "action_cable/engine"
require "listen"
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
        urls: ["/lookbook-assets"], root: root.join("public").to_s
      )
    end

    initializer "lookbook.file_watcher.paths" do
      opts.listen_paths += opts.preview_paths
      opts.listen_paths << opts.components_path
    end

    initializer "lookbook.file_watcher.previews" do
      file_watcher.watch(opts.listen_paths, opts.listen_extensions, wait_for_delay: 0.5) do |changes|
        parser.parse { run_hooks(:after_change, changes) }
      end
    end

    initializer "lookbook.file_watcher.pages" do
      file_watcher.watch(opts.page_paths, opts.page_extensions) do |changes|
        Engine.pages.load(Engine.page_paths)
        Engine.websocket.broadcast(:reload)
        run_hooks(:after_change, changes)
      end
    end

    initializer "lookbook.parser.previews_load_callback" do
      parser.after_parse do |code_objects|
        Engine.previews.load(code_objects.all(:class))
        Engine.websocket.broadcast(:reload)
      end
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
      if Rails.application.respond_to?(:server)
        Rails.application.server { file_watcher.start if listen? }
      elsif process.supports_listening?
        file_watcher.start if listen?
      end
    end

    config.after_initialize do
      Engine.pages.load(Engine.page_paths)
      parser.parse { run_hooks(:after_initialize) }
    end

    def opts
      Lookbook.config
    end

    def run_hooks(event_name, *args)
      Engine.hooks.for_event(event_name).each do |hook|
        hook.call(Lookbook, *args)
      end
    end

    def parser
      @_parser ||= PreviewParser.new(opts.preview_paths, Engine.tags)
    end

    def file_watcher
      @_file_watcher ||= FileWatcher.new(force_polling: opts.listen_use_polling)
    end

    def process
      @_process ||= Process.new(env: Rails.env)
    end

    def listen?
      opts.listen && process.supports_listening?
    end

    class << self
      def mount_path
        routes.find_script_name({})
      end

      def mounted?
        mount_path.present?
      end

      def app_name
        name = if Rails.application.class.respond_to?(:module_parent_name)
          Rails.application.class.module_parent_name
        else
          Rails.application.class.parent_name
        end
        name.underscore
      end

      def websocket
        if mounted?
          use_websocket = opts.auto_refresh && opts.listen && process.supports_listening?
          @websocket ||= use_websocket ? Websocket.new(mount_path, logger: Lookbook.logger) : Websocket.noop
        else
          Websocket.noop
        end
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

      def component_paths
        @_component_paths ||= Array(PathUtils.to_absolute(opts.components_path))
      end

      def page_paths
        @_page_paths ||= PathUtils.normalize_paths(opts.page_paths)
      end

      def preview_paths
        @_preview_paths ||= PathUtils.normalize_paths(opts.preview_paths)
      end

      def pages
        @_pages ||= PageCollection.new
      end

      def previews
        @_previews ||= PreviewCollection.new
      end

      attr_reader :preview_controller
    end

    at_exit do
      file_watcher.stop
      run_hooks(:before_exit)
    end
  end
end
