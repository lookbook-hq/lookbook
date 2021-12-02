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
  end

  class Engine < Rails::Engine
    isolate_namespace Lookbook

    config.lookbook = ActiveSupport::OrderedOptions.new
    config.lookbook.listen_paths ||= []
    config.lookbook.preview_paths ||= []

    initializer "view_component.set_configs" do |app|
      options = app.config.lookbook
      vc_options = app.config.view_component

      options.auto_refresh = true if options.auto_refresh.nil?
      options.sort_examples = false if options.sort_examples.nil?
      options.debug = false unless options.debug == true

      options.preview_paths = options.preview_paths.map(&:to_s)
      options.preview_paths += vc_options.preview_paths

      options.preview_controller = vc_options.preview_controller if options.preview_controller.nil?
      options.preview_srcdoc = true if options.preview_srcdoc.nil?
      options.preview_display_params ||= {}.with_indifferent_access

      options.listen_paths = options.listen_paths.map(&:to_s)
      options.listen_paths += options.preview_paths
      options.listen_paths << (vc_options.view_component_path || Rails.root.join("app/components"))

      options.experimental_features = false unless options.experimental_features.present?
    end

    initializer "lookbook.cable.config" do |app|
      if app.config.lookbook.auto_refresh
        Lookbook::Engine.cable.cable = {adapter: "async"}.with_indifferent_access
        Lookbook::Engine.cable.mount_path = "/cable"
        Lookbook::Engine.cable.connection_class = -> { Lookbook::Connection }
      end
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
        Lookbook::Engine.cable.logger ||= Rails.logger
      else
        Lookbook::Engine.cable.logger = Lookbook::NullLogger.new
        config.action_view.logger = Lookbook::NullLogger.new
      end
    end

    initializer "lookbook.preview.extend" do
      ActiveSupport.on_load(:view_component) do
        ViewComponent::Preview.extend Lookbook::Preview
      end
    end

    config.after_initialize do |app|
      @listener = Listen.to(*app.config.lookbook.listen_paths, only: /\.(rb|html.*)$/) do |modified, added, removed|
        parser.parse
        if app.config.lookbook.auto_refresh
          if (modified.any? || removed.any?) && added.none?
            Lookbook::Engine.websocket.broadcast("reload", {
              modified: modified,
              removed: removed
            })
          end
        end
      end
      @listener.start
      parser.parse
    end

    at_exit do
      @listener&.stop
    end

    class << self
      def websocket
        if Rails.version.to_f >= 6.0
          @websocket ||= ActionCable::Server::Base.new(config: Lookbook::Engine.cable)
        else
          @websocket = ActionCable::Server::Base.new
          @websocket.config = Lookbook::Engine.cable

          @websocket
        end
      end

      def websocket_mount_path
        "#{Lookbook::Engine.routes.find_script_name({})}#{cable.mount_path}"
      end

      def cable
        @cable ||= ActionCable::Server::Configuration.new
      end

      def parser
        @parser ||= Lookbook::Parser.new(config.lookbook.preview_paths)
      end
    end
  end
end
