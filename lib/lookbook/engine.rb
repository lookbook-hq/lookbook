require "view_component"
require "action_cable/engine"
require "listen"

module Lookbook
  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.autoload_paths << File.expand_path(Lookbook::Engine.root.join("app/components"))
    config.lookbook = Lookbook.config

    initializer "lookbook.viewcomponent.config" do
      config.lookbook.preview_paths += config.view_component.preview_paths
      config.lookbook.preview_controller ||= config.view_component.preview_controller

      config.lookbook.components_path = config.view_component.view_component_path if config.view_component.view_component_path.present?

      config.lookbook.listen_paths += config.lookbook.preview_paths
      config.lookbook.listen_paths << config.lookbook.components_path
    end

    initializer "lookbook.parser.tags" do
      Lookbook::Parser.define_tags(Lookbook.config.preview_tags)
    end

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"], root: Lookbook::Engine.root.join("public").to_s
      )
    end

    config.after_initialize do
      @preview_controller = Lookbook.config.preview_controller.constantize
      @preview_controller.include(Lookbook::PreviewController)

      parser.after_parse do |registry|
        Preview.load!(registry.all(:class))
        reload_ui
      end

      if Gem::Version.new(Rails.version) >= Gem::Version.new("6.1.3.1")
        # Rails.application.server is only available for newer Rails versions
        Rails.application.server do
          init_listeners
        end
      else
        # Fallback for older Rails versions - don't start listeners if running in a rake task.
        unless Lookbook::Engine.prevent_listening?
          init_listeners
        end
      end

      parser.parse do
        Lookbook::Engine.run_hooks(:after_initialize)
      end
    end

    at_exit do
      if Lookbook::Engine.listeners.any?
        Lookbook.logger.debug "Stopping listeners"
        Lookbook::Engine.stop_listeners
      end
      Lookbook::Engine.run_hooks(:before_exit)
    end

    class << self
      def init_listeners
        config = Lookbook.config
        return unless config.listen == true
        Listen.logger = Lookbook.logger

        listen_paths = config.listen_paths.uniq
        if listen_paths.any?
          preview_listener = Listen.to(*listen_paths,
            only: /\.(#{config.listen_extensions.join("|")})$/,
            wait_for_delay: 0.5,
            force_polling: config.listen_use_polling) do |modified, added, removed|
            parser.parse do
              run_hooks(:after_change, {modified: modified, added: added, removed: removed})
            end
          end
          register_listener(preview_listener)
        end

        page_paths = config.page_paths.uniq
        if page_paths.any?
          page_listener = Listen.to(*page_paths,
            only: /\.(html.*|md.*)$/,
            force_polling: config.listen_use_polling) do |modified, added, removed|
            changes = {modified: modified, added: added, removed: removed}
            reload_ui
            run_hooks(:after_change, changes)
          end
          register_listener(page_listener)
        end
      end

      def websocket
        config = Lookbook.config
        return @websocket unless @websocket.nil?
        return unless config.auto_refresh == true && config.listen == true && !Rails.env.test?
        Lookbook.logger.info "Initializing websocket"

        cable = ActionCable::Server::Configuration.new
        cable.cable = {adapter: "async"}.with_indifferent_access
        cable.mount_path = nil
        cable.connection_class = -> { Lookbook::Connection }
        cable.logger = Lookbook.logger

        @websocket ||= if Gem::Version.new(Rails.version) >= Gem::Version.new(6.0)
          ActionCable::Server::Base.new(config: cable)
        else
          ws = ActionCable::Server::Base.new
          ws.config = cable
          ws
        end
      end

      def websocket_mount_path
        "#{mounted_path}#{config.lookbook.cable_mount_path}".gsub("//", "/") if websocket?
      end

      def websocket?
        websocket.present?
      end

      def mounted_path
        Lookbook::Engine.routes.find_script_name({})
      end

      def parser
        @parser ||= Lookbook::Parser.new(config.lookbook.preview_paths)
      end

      def log_level
        Lookbook.logger.level
      end

      def app_name
        name = if Gem::Version.new(Rails.version) >= Gem::Version.new("6.1")
          Rails.application.class.module_parent_name
        else
          Rails.application.class.parent_name
        end
        name.underscore
      end

      def register_listener(listener)
        listener.start
        listeners << listener
      end

      def listeners
        @listeners ||= []
      end

      def stop_listeners
        listeners.each { |listener| listener.stop }
      end

      def run_hooks(event_name, *args)
        config.lookbook.hooks[event_name].each do |hook|
          hook.call(Lookbook, *args)
        end
      end

      def reload_ui
        websocket&.broadcast("reload", {})
      end

      def prevent_listening?
        Rails.env.test? || running_in_rake_task?
      end

      def running_in_rake_task?
        if defined?(Rake) && Rake.respond_to?(:application)
          File.basename($0) == "rake" || Rake.application.top_level_tasks.any?
        else
          false
        end
      end

      attr_reader :preview_controller
    end
  end
end
