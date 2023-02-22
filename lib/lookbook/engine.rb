require "yard"

module Lookbook
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.autoload_paths << File.expand_path(root.join("app/components"))

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"],
        root: root.join("public").to_s
      )
    end

    config.before_configuration do
      config.lookbook = Lookbook.config

      if defined?(ViewComponent)
        config.lookbook.using_view_component = true
      else
        require "view_component"
        config.lookbook.using_view_component = false
      end
    end

    config.after_initialize do
      if opts.using_view_component
        vc_config = Engine.host_config.view_component

        opts.preview_paths += vc_config.preview_paths
        opts.preview_controller = vc_config.preview_controller
        opts.preview_layout = vc_config.default_preview_layout

        vc_config.show_previews = true

        if vc_config.view_component_path.present?
          opts.component_paths << vc_config.view_component_path
        end
      end

      opts.reload_on_change = host_config.reload_classes_only_on_change if opts.reload_on_change.nil?
    end

    config.after_initialize do
      reloaders.add(:previews, Engine.preview_watch_paths, opts.listen_extensions, &Engine.method(:load_previews))
      reloaders.add(:pages, Engine.page_watch_paths, opts.page_extensions, &Engine.method(:load_pages))
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
      delegate :app_name, to: :runtime_context

      def mount_path
        routes.find_script_name({})
      end

      def mounted?
        mount_path.present?
      end

      def reloading?
        opts.reload_on_change
      end

      def auto_refresh?
        opts.live_updates == true &&
          reloading? &&
          runtime_context.web? &&
          FileWatcher.evented?
      end

      def preview_embeds_allowed?
        opts.preview_embeds.enabled == true && opts.preview_embeds.policy != "DENY"
      end

      def websocket
        @_websocket ||= auto_refresh? ? Websocket.new(mount_path, logger: Lookbook.logger) : NullWebsocket.new
      end

      def runtime_context
        @_runtime_context ||= RuntimeContext.new(env: Rails.env)
      end

      def theme
        @_theme ||= Lookbook::Theme.new(opts.ui_theme, opts.ui_theme_overrides)
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

      def host_app_path
        Rails.application.root.join("app")
      end

      def host_config
        Rails.application.config
      end

      def view_paths
        # handle view path registry changes in Rails 7.1
        paths = if defined?(ActionView::ViewPaths::Registry)
          ActionView::ViewPaths::Registry.all_file_system_resolvers.map(&:path)
        else
          ActionView::ViewPaths.all_view_paths.flat_map(&paths)
        end
        paths.map { |path| Pathname(path.to_s) }
      end

      def component_paths
        @_component_paths ||= begin
          paths = [*opts.component_paths, *view_paths, host_app_path]
          PathUtils.normalize_paths(paths)
        end
      end

      def page_paths
        @_page_paths ||= PathUtils.normalize_paths(opts.page_paths)
      end

      alias_method :page_watch_paths, :page_paths

      def preview_paths
        @_preview_paths ||= PathUtils.normalize_paths(opts.preview_paths)
      end

      def preview_watch_paths
        return @_preview_watch_paths if @_preview_watch_paths

        paths = [*opts.preview_paths, *opts.component_paths, *opts.listen_paths, *view_paths].uniq
        @_preview_watch_paths ||= PathUtils.normalize_paths(paths)
      end

      def pages
        @_pages ||= PageCollection.new
      end

      def previews
        @_previews ||= PreviewCollection.new
      end

      def preview_controller
        return @_preview_controller if @_preview_controller

        @_preview_controller = opts.preview_controller.constantize
        @_preview_controller.include PreviewControllerActions
      end

      def load_previews(changes = nil)
        changed_files = [*changes[:added], *changes[:modified]] if changes
        parser.parse(changed_files) do |code_objects|
          previews.load(code_objects.all(:class), changes)
          mark_changed
        end
      end

      def load_pages(changes = nil)
        pages.load(Engine.page_paths, changes)
        mark_changed
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

      def mark_changed
        @_last_changed = (Time.now.to_f * 1000).to_i
      end

      def last_changed
        mark_changed unless @_last_changed
        @_last_changed
      end
    end

    at_exit do
      Engine.run_hooks(:before_exit)
    end
  end
end
