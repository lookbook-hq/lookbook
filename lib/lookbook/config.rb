require "lookbook/markdown"

module Lookbook
  class ConfigOptions < ActiveSupport::OrderedOptions
    def initialize(**data)
      super()
      data.keys.each { |key| self[key.to_sym] = data[key] }
    end

    def [](key)
      super(key.to_sym)
    end

    def []=(key, value)
      super(key.to_sym, value)
    end
  end

  class Config
    def initialize
      @store = ConfigOptions.new(**{
        project_name: "Lookbook",
        log_level: 2,
        auto_refresh: true,
        
        page_controller: "Lookbook::PageController",
        page_route: "pages",
        page_paths: ["test/components/docs"],
        page_options: ConfigOptions.new,
        markdown_options: ConfigOptions.new(**Markdown::DEFAULT_OPTIONS),

        preview_paths: [],
        preview_display_params: ConfigOptions.new,
        preview_options: ConfigOptions.new,
        preview_srcdoc: false,
        sort_examples: true,

        listen: Rails.env.development?,
        listen_paths: [],
        listen_use_polling: false,

        cable_mount_path: "/lookbook-cable",
        cable_logger: Lookbook.logger,

        runtime_parsing: !Rails.env.production?,
        parser_registry_path: "tmp/storage/.yardoc",

        ui_theme: "indigo",
        ui_theme_overrides: ConfigOptions.new,
        experimental_features: false,
      })
    end

    def ui_theme=(name)
      name = name.to_s
      if ["indigo", "zinc", "blue"].include?(name)
        @store[:ui_theme] = name
      else
        Lookbook.logger.warn "'#{name}' is not a valid Lookbook theme. Falling back to default."
      end
    end

    def ui_theme_overrides=(theme)
       @store[:ui_theme_overrides] = ConfigOptions.new(theme)
    end

    def ui_theme_overrides(&block)
      if block_given?
        yield get(:ui_theme_overrides)
      else
        get(:ui_theme_overrides)
      end
    end

    def [](key)
      get(key.to_sym)
    end

    def []=(key, value)
      @store[key.to_sym] = value
    end

    def to_h
      @store.map { |key, value| [key, get(key.to_sym)] }.to_h
    end

    def to_json(*a)
      to_h.to_json(*a)
    end
    
    protected

    def get_project_name(name)
      name == false ? nil : name
    end

    def normalize_paths(paths)
      paths.map! { |path| absolute_path(path) }
      paths.filter! { |path| Dir.exist?(path) }
      paths
    end

    def absolute_path(path)
      File.absolute_path(path.to_s, Rails.root)
    end

    alias_method :get_page_paths, :normalize_paths
    alias_method :get_preview_paths, :normalize_paths
    alias_method :get_listen_paths, :normalize_paths
    alias_method :get_parser_registry_path, :absolute_path

    def get(name)
      getter_name = "get_#{name}".to_sym
      respond_to?(getter_name, true) ? send(getter_name, @store[name]) : @store[name]
    end

    def set(name, *args)
      @store.send(name, *args)
    end

    def method_missing(name, *args)
      args.any? ? set(name, *args) : get(name)
    end
  end
end