require "view_component"
require "action_cable/engine"
require "listen"

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
        self.class.websocket.broadcast(:reload)
        run_hooks(:after_change, changes)
      end
    end

    initializer "lookbook.parser.setup" do
      Parser.define_tags(Engine.tags)
    end

    initializer "lookbook.parser.register_callback" do
      parser.after_parse do |registry|
        Preview.load!(registry.all(:class))
        self.class.websocket.broadcast(:reload)
      end
    end

    config.after_initialize do
      @preview_controller = opts.preview_controller.constantize
      @preview_controller.include(Lookbook::PreviewController)
    end

    config.after_initialize do
      if listen?
        if Gem::Version.new(Rails.version) >= Gem::Version.new("6.1.3.1")
          # Rails.application.server is only available for newer Rails versions
          Rails.application.server { file_watcher.start }
        elsif process.supports_listening?
          file_watcher.start
        end
        # Fallback for older Rails versions
      end
    end

    config.after_initialize do
      parser.parse { run_hooks(:after_initialize) }
    end

    def opts
      Lookbook.config
    end

    def run_hooks(event_name, *args)
      self.class.hooks.for_event(event_name).each do |hook|
        hook.call(Lookbook, *args)
      end
    end

    def parser
      preview_paths = PathUtils.normalize_all(opts.preview_paths)
      @parser ||= Parser.new(preview_paths)
    end

    def file_watcher
      @file_watcher ||= FileWatcher.new(force_polling: opts.listen_use_polling)
    end

    def process
      @process ||= Process.new(env: Rails.env)
    end

    def listen?
      opts.listen && process.supports_listening?
    end

    def self.mount_path
      routes.find_script_name({})
    end

    def self.mounted?
      mount_path.present?
    end

    def self.app_name
      name = if Gem::Version.new(Rails.version) >= Gem::Version.new("6.1")
        Rails.application.class.module_parent_name
      else
        Rails.application.class.parent_name
      end
      name.underscore
    end

    def self.websocket
      if mounted?
        use_websocket = opts.auto_refresh && opts.listen && process.supports_listening?
        @websocket ||= use_websocket ? Websocket.new(mount_path, logger: Lookbook.logger) : Websocket.noop
      else
        Websocket.noop
      end
    end

    def self.panels
      @panels ||= PanelStore.init_from_config
    end

    def self.inputs
      @inputs ||= InputStore.init_from_config
    end

    def self.tags
      @tags ||= TagStore.init_from_config
    end

    def self.hooks
      @hooks ||= HookStore.init_from_config
    end

    def self.preview_controller
      @preview_controller
    end

    at_exit do
      file_watcher.stop
      run_hooks(:before_exit)
    end
  end
end
