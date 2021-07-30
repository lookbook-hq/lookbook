module Lookbook

  class << self
    def config
      @config ||= Engine.config.lookbook
    end

    def cable
      @cable ||= ActionCable::Server::Configuration.new
    end
  end

  class Engine < Rails::Engine
    isolate_namespace Lookbook

    Lookbook.autoload :Navigation, "lookbook/navigation"
    Lookbook.autoload :Preview, "lookbook/preview"
    Lookbook.autoload :PreviewExample, "lookbook/preview_example"
    Lookbook.autoload :Parser, "lookbook/parser"

    config.lookbook = ActiveSupport::OrderedOptions.new
    config.lookbook.listen_paths ||= []

    initializer "view_component.set_configs" do |app|
      options = app.config.lookbook

      options.auto_refresh = true if options.auto_refresh.nil?
      config.lookbook.listen_paths = config.lookbook.listen_paths.map(&:to_s)
      config.lookbook.listen_paths += config.view_component.preview_paths
      config.lookbook.listen_paths << (config.view_component.view_component_path || "app/components")

      ActiveSupport.on_load(:lookbook) do
        options.each { |k, v| send("#{k}=", v) if respond_to?("#{k}=") }
      end
    end

    initializer "lookbook.cable.config" do |app|
      config_path = Lookbook::Engine.root.join("config", "lookbook_cable.yml")
      Lookbook.cable.cable = app.config_for(config_path).with_indifferent_access
      Lookbook.cable.mount_path = "/cable"
      Lookbook.cable.connection_class = -> { Lookbook::Connection }
    end

    initializer "lookbook.cable.logger" do
      Lookbook.cable.logger ||= Rails.logger
    end

    initializer "lookbook.assets.serve" do
      config.app_middleware.use(
        Rack::Static,
        urls: ["/lookbook-assets"], root: Lookbook::Engine.root.join("public").to_s
      )
    end

    initializer "lookbook.preview.extend" do
      ActiveSupport.on_load(:view_component) do
        ViewComponent::Preview.extend Lookbook::Preview
      end
    end

    config.after_initialize do |app|
      if app.config.lookbook.auto_refresh
        @listener = Listen.to(*app.config.lookbook.listen_paths, only: /\.(rb|html.*)$/) do |modified, added, removed|
          if (modified.any? || removed.any?) && added.none?
            Lookbook::Engine.parser.parse
            Lookbook::Engine.websocket.broadcast("reload", {modified: modified, removed: removed})
          end
        end
        @listener.start
      end
    end

    at_exit do
      @listener&.stop
    end

    class << self
      def websocket
        @websocket ||= ActionCable::Server::Base.new(config: Lookbook.cable)
      end

      def parser
        return @parser if @parser
        @parser = Lookbook::Parser.new(config.lookbook.listen_paths)
        @parser.define_tags
        @parser.parse
        @parser
      end
    end
  end
end
