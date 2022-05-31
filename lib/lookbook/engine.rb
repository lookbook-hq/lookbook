require "rails"
require "view_component"
require "action_cable/engine"
require "listen"

module Lookbook
  class << self
    def config
      @config ||= Engine.config.lookbook
    end

    def logger
      @logger ||= Rails.env.development? ? Logger.new($stdout) : Rails.logger
    end

    def version
      Lookbook::VERSION
    end

    def debug_data
      {
        config: config
      }
    end
  end

  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.lookbook = ActiveSupport::OrderedOptions.new
    config.lookbook.listen_paths ||= []
    config.lookbook.preview_paths ||= []
    config.lookbook.page_paths ||= ["test/components/docs"]

    config.autoload_paths << File.expand_path(Lookbook::Engine.root.join("app/components"))

    initializer "view_component.set_configs" do
      options = config.lookbook
      vc_options = config.view_component

      options.project_name ||= options.project_name == false ? nil : options.project_name || "Lookbook"
      options.auto_refresh = true if options.auto_refresh.nil?
      options.log_level ||= 2
      options.sort_examples = false if options.sort_examples.nil?

      options.preview_paths = options.preview_paths.map(&:to_s)
      options.preview_paths += vc_options.preview_paths

      options.page_paths = options.page_paths.map(&:to_s)
      options.page_controller = "Lookbook::PageController" if options.page_controller.nil?
      options.page_route ||= "pages"
      options.page_options ||= {}.with_indifferent_access

      options.markdown_options = Markdown::DEFAULT_OPTIONS.merge(options.markdown_options || {})

      options.preview_controller = vc_options.preview_controller if options.preview_controller.nil?
      options.preview_srcdoc = false if options.preview_srcdoc.nil?
      options.preview_display_params ||= {}.with_indifferent_access
      options.preview_options ||= {}.with_indifferent_access

      options.listen = Rails.env.development? if options.listen.nil?
      options.listen_use_polling = false if options.listen_use_polling.nil?
      options.listen_paths = options.listen_paths.map(&:to_s)
      options.listen_paths += options.preview_paths
      options.listen_paths << (vc_options.view_component_path || Rails.root.join("app/components"))
      options.listen_paths.filter! { |path| Dir.exist? path }

      options.cable_mount_path ||= "/lookbook-cable"
      options.cable_logger ||= Lookbook.logger

      options.runtime_parsing = !Rails.env.production? if options.runtime_parsing.nil?
      options.parser_registry_path ||= Rails.root.join("tmp/storage/.yardoc")

      options.ui_theme ||= :default
      options.ui_theme_css = options.ui_theme_css.present? ? Rails.root.join(options.ui_theme_css) : nil

      options.experimental_features = false unless options.experimental_features.present?
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
          begin
            parser.parse
          rescue
          end
          Lookbook::Preview.clear_cache
          Lookbook::Engine.websocket&.broadcast("reload", {})
        end
        Lookbook::Engine.register_listener(preview_listener)

        page_listener = Listen.to(
          *config.lookbook.page_paths.filter { |dir| Dir.exist? dir },
          only: /\.(html.*|md.*)$/,
          force_polling: Lookbook.config.listen_use_polling
        ) do |modified, added, removed|
          Lookbook::Engine.websocket&.broadcast("reload", {})
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
    end

    at_exit do
      if config.lookbook.listen
        Lookbook.logger.debug "Stopping listeners"
        Lookbook::Engine.listeners.each do |listener|
          listener.stop
        end
      end
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

      attr_reader :preview_controller
    end
  end
end
