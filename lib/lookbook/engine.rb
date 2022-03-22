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
      @logger ||= config.debug == true ? Rails.logger : Lookbook::NullLogger.new
    end

    def version
      Lookbook::VERSION
    end
  end

  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.lookbook = ActiveSupport::OrderedOptions.new
    config.lookbook.listen_paths ||= []
    config.lookbook.preview_paths ||= []
    config.lookbook.page_paths ||= ["test/components/docs"]

    initializer "view_component.set_configs" do
      options = config.lookbook
      vc_options = config.view_component

      options.project_name ||= "Lookbook"
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

      options.listen_paths = options.listen_paths.map(&:to_s)
      options.listen_paths += options.preview_paths
      options.listen_paths << (vc_options.view_component_path || Rails.root.join("app/components"))
      options.listen_paths.filter! { |path| Dir.exist? path }

      options.cable = ActionCable::Server::Configuration.new
      options.cable.cable = {adapter: "async"}.with_indifferent_access
      options.cable.mount_path ||= "/lookbook-cable"
      options.cable.connection_class = -> { Lookbook::Connection }

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

    initializer "lookbook.logging" do
      if config.lookbook.debug == true
        config.lookbook.cable.logger ||= Rails.logger
      else
        config.lookbook.cable.logger = Lookbook::NullLogger.new
        config.action_view.logger = Lookbook::NullLogger.new
      end
    end

    initializer "lookbook.helpers" do
      config.action_controller.include_all_helpers = false
    end

    config.after_initialize do
      Array(config.view_component.preview_paths).each do |preview_path|
        Dir["#{preview_path}/**/*_preview.rb"].sort.each { |file| require_dependency file }
      end

      @preview_listener = Listen.to(*config.lookbook.listen_paths, only: /\.(rb|html.*)$/) do |modified, added, removed|
        parser.parse
        if Lookbook::Engine.websocket
          if (modified.any? || removed.any?) && added.none?
            Lookbook::Engine.websocket.broadcast("reload", {
              modified: modified,
              removed: removed
            })
          end
        end
      end

      @page_listener = Listen.to(*config.lookbook.page_paths, only: /\.(html.*|md.*)$/) do |modified, added, removed|
        if Lookbook::Engine.websocket
          if modified.any? || removed.any? || added.any?
            Lookbook::Engine.websocket.broadcast("reload", {
              modified: modified,
              removed: removed,
              added: added
            })
          end
        end
      end

      @preview_listener.start
      @page_listener.start
      parser.parse
    end

    at_exit do
      @preview_listener&.stop
      @page_listener&.stop
    end

    class << self
      def websocket
        if config.lookbook.auto_refresh
          @websocket ||= if Rails.version.to_f >= 6.0
            ActionCable::Server::Base.new(config: config.lookbook.cable)
          else
            websocket ||= ActionCable::Server::Base.new
            websocket.config = config.lookbook.cable
            websocket
          end
        end
      end

      def websocket_mount_path
        "#{mounted_path}#{config.lookbook.cable.mount_path}" if websocket
      end

      def mounted_path
        Lookbook::Engine.routes.find_script_name({})
      end

      def parser
        @parser ||= Lookbook::Parser.new(config.lookbook.preview_paths)
      end
    end
  end
end
