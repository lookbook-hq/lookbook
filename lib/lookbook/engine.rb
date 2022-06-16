require "rails"
require "view_component"
require "action_cable/engine"
require "listen"

module Lookbook

  autoload :Config, "lookbook/config"
  
  class << self
    def config
      @config ||= Config.new
    end

    def configure
      yield(config)
    end

    def logger
      @logger ||= Rails.env.development? ? Logger.new($stdout) : Rails.logger
    end

    def version
      Lookbook::VERSION
    end

    def debug_data
      {
        version: version,
        env: Rails.env.to_s,
        config: config
      }
    end

    def on(event_name, &block)
      if config.hooks[event_name].is_a? Array
        config.hooks[event_name] << block
      else
        Lookbook.logger.error "'#{event_name}' is not a valid hook name"
      end
    end

    def previews
      Preview.all
    end

    def pages
      Page.all
    end

    def broadcast(event_name, data = {})
      Engine.websocket&.broadcast(event_name.to_s, data)
    end
  end

  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.lookbook = Lookbook.config
    config.autoload_paths << File.expand_path(Lookbook::Engine.root.join("app/components"))

    initializer "lookbook.viewcomponent.config" do      
      config.lookbook.preview_paths += config.view_component.preview_paths
      config.lookbook.preview_controller ||= config.view_component.preview_controller

      config.lookbook.components_path = config.view_component.view_component_path if config.view_component.view_component_path.present?

      config.lookbook.listen_paths += config.lookbook.preview_paths
      config.lookbook.listen_paths << config.lookbook.components_path 
    end

    initializer "lookbook.logging.development" do
      Lookbook.logger.level = Lookbook.config.log_level if Rails.env.development?
    end

    initializer "lookbook.parser.tags" do
      Lookbook::Parser.define_tags
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

      if config.lookbook.listen
        Listen.logger = Lookbook.logger
        preview_listener = Listen.to(
          *config.lookbook.listen_paths,
          only: /\.(rb|html.*)$/,
          force_polling: Lookbook.config.listen_use_polling
        ) do |modified, added, removed|
          changes = { modified: modified, added: added, removed: removed }
          begin
            parser.parse
          rescue
          end
          Lookbook::Preview.clear_cache
          Lookbook::Engine.reload_ui(changes)
          Lookbook::Engine.run_hooks(:file_updated, changes)
        end
        Lookbook::Engine.register_listener(preview_listener)

        page_listener = Listen.to(
          *config.lookbook.page_paths,
          only: /\.(html.*|md.*)$/,
          force_polling: Lookbook.config.listen_use_polling
        ) do |modified, added, removed|
          changes = { modified: modified, added: added, removed: removed }
          Lookbook::Engine.reload_ui(changes)
          Lookbook::Engine.run_hooks(:file_updated, changes)
        end
        Lookbook::Engine.register_listener(page_listener)
      end

      if config.lookbook.runtime_parsing
        parser.parse
      else
        unless File.exist?(config.lookbook.parser_registry_path)
          Lookbook.logger.warn "
            Runtime parsing is disabled but no registry file has been found.
            Did you run `rake lookbook:preparse` before starting the app?
            Expected to find registry file at #{config.lookbook.parser_registry_path}
          "
        end
      end

      Lookbook::Engine.run_hooks(:start)
    end

    at_exit do
      if config.lookbook.listen
        Lookbook.logger.debug "Stopping listeners"
        Lookbook::Engine.listeners.each { |listener| listener.stop } 
      end
      Lookbook::Engine.run_hooks(:exit)
    end

    class << self

      def websocket
        if config.lookbook.auto_refresh
          cable = ActionCable::Server::Configuration.new
          cable.cable = {adapter: "async"}.with_indifferent_access
          cable.mount_path = config.lookbook.cable_mount_path
          cable.connection_class = -> { Lookbook::Connection }
          cable.logger = config.lookbook.cable_logger

          @websocket ||= if Rails.version.to_f >= 6.0
            ActionCable::Server::Base.new(config: cable)
          else
            websocket ||= ActionCable::Server::Base.new
            websocket.config = cable
            websocket
          end
        end
      end

      def websocket_mount_path
        "#{mounted_path}#{config.lookbook.cable_mount_path}" if websocket
      end

      def mounted_path
        Lookbook::Engine.routes.find_script_name({})
      end

      def parser
        @parser ||= Lookbook::Parser.new(config.lookbook.preview_paths, config.lookbook.parser_registry_path)
      end

      def log_level
        Lookbook.logger.level
      end

      def app_name
        Rails.application.class.module_parent_name.underscore
      end

      def register_listener(listener)
        listener.start
        listeners << listener
      end

      def listeners
        @listeners ||= []
      end

      def run_hooks(event_name, *args)
        Lookbook.config.hooks[event_name].each do |hook|
          hook.call(Lookbook, *args)
        end
      end

      def reload_ui(changed = {})
        websocket&.broadcast("reload", changed)
      end

      attr_reader :preview_controller
    end
  end
end
