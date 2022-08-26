require "rails"
require "view_component"
require "action_cable/engine"
require "listen"
require "rake"

module Lookbook
  class << self
    def config
      @config ||= Engine.config.lookbook
    end

    def logger
      @logger ||= Rails.logger
    end

    def version
      Lookbook::VERSION
    end
  end

  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.lookbook = ActiveSupport::OrderedOptions.new
    config.lookbook.listen_paths ||= []
    config.lookbook.listen_extensions ||= []
    config.lookbook.preview_paths ||= []
    config.lookbook.page_paths ||= ["test/components/docs"]

    initializer "view_component.set_configs" do
      options = config.lookbook
      vc_options = config.view_component

      options.project_name ||= options.project_name == false ? nil : options.project_name || "Lookbook"
      options.auto_refresh = true if options.auto_refresh.nil?
      options.sort_examples = false if options.sort_examples.nil?
      options.debug = false unless options.debug == true

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

      options.listen = Rails.env.development? if options.listen.nil?
      options.listen_paths = options.listen_paths.map(&:to_s)
      options.listen_paths += options.preview_paths
      options.listen_paths << (vc_options.view_component_path || Rails.root.join("app/components"))
      options.listen_paths.select! { |path| Dir.exist? path }

      options.listen_extensions += ["rb", "html.*"]
      options.listen_extensions.uniq!

      options.cable_mount_path ||= "/lookbook-cable"
      options.cable_logger ||= Rails.logger

      options.runtime_parsing = !Rails.env.production? if options.runtime_parsing.nil?
      options.parser_registry_path ||= Rails.root.join("tmp/storage/.yardoc")

      options.experimental_features = false unless options.experimental_features.present?
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

      if Gem::Version.new(Rails.version) >= Gem::Version.new("6.1.3.1")
        # Rails.application.server is only available for newer Rails versions
        Rails.application.server do
          init_listeners
        end
      else
        # Fallback for older Rails versions - don't start listeners if running in a rake task.
        unless File.basename($0) == "rake" || Rake.application.top_level_tasks.any?
          init_listeners 
        end
      end

      if config.lookbook.runtime_parsing
        Lookbook::Engine.parser.parse
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

    def init_listeners
      if config.lookbook.listen
        @preview_listener = Listen.to(*config.lookbook.listen_paths, only: /\.(#{config.lookbook.listen_extensions.join("|")})$/) do |modified, added, removed|
          begin
            Lookbook::Engine.parser.parse
          rescue
          end
          Lookbook::Preview.clear_cache
          Lookbook::Engine.websocket&.broadcast("reload", {
            modified: modified,
            removed: removed,
            added: added
          })
        end
        @preview_listener.start

        if Lookbook::Features.enabled?(:pages)
          @page_listener = Listen.to(*config.lookbook.page_paths.select { |dir| Dir.exist? dir }, only: /\.(html.*|md.*)$/) do |modified, added, removed|
            Lookbook::Engine.websocket&.broadcast("reload", {
              modified: modified,
              removed: removed,
              added: added
            })
          end
          @page_listener.start
        end
      end
    end

    at_exit do
      @preview_listener&.stop
      @page_listener&.stop
    end

    class << self
      def websocket
        return @websocket unless @websocket.nil?
        if config.lookbook.auto_refresh
          cable = ActionCable::Server::Configuration.new
          cable.cable = {adapter: "async"}.with_indifferent_access
          cable.mount_path = config.lookbook.cable_mount_path
          cable.connection_class = -> { Lookbook::Connection }
          cable.logger = config.lookbook.cable_logger

          @websocket ||= if Rails.version.to_f >= 6.0
            ActionCable::Server::Base.new(config: cable)
          else
            ws = ActionCable::Server::Base.new
            ws.config = cable
            ws
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

      attr_reader :preview_controller
    end
  end
end
