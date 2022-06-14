require "lookbook/markdown"
require "lookbook/theme"

module Lookbook
  class ConfigOptions < ActiveSupport::OrderedOptions
    def initialize(data = {}, hashes_as_options = true)
      super()
      @hashes_as_options = hashes_as_options
      set(data) if data.present?
    end

    def [](key)
      super(normalize_key(key))
    end

    def []=(key, value)
      super(normalize_key(key), normalize_value(value))
    end

    def set(data)
      data.keys.each do |key|
        self[normalize_key(key)] = normalize_value(data[key])
      end
      self
    end

    def method_missing(name, *args)
      super(normalize_key(name), *args.map { |arg| normalize_value(arg) })
    end

    def normalize_key(key)
      key.to_s.downcase.gsub("-", "_").to_sym
    end

    def normalize_value(value)
      @hashes_as_options && value.is_a?(Hash) ? ConfigOptions.new(value) : value
    end
  end

  class Config
    def initialize
      @options = ConfigOptions.new
      
      @options.set({
        project_name: "Lookbook",
        log_level: 2,
        auto_refresh: true,
        
        page_controller: "Lookbook::PageController",
        page_route: "pages",
        page_paths: ["test/components/docs"],
        page_options: {},
        markdown_options: Markdown::DEFAULT_OPTIONS,

        preview_paths: [],
        preview_display_params: {},
        preview_options: {},
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
        ui_theme_overrides: {},

        inspector_panels: {},

        experimental_features: false,
      })
    end

    def ui_theme=(name)
      name = name.to_s
      if Theme.valid_theme?(name)
        @options[:ui_theme] = name
      else
        Lookbook.logger.warn "'#{name}' is not a valid Lookbook theme. Theme setting not changed."
      end
    end

    def ui_theme_overrides=(theme)
      @options[:ui_theme_overrides] = theme
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
      @options[key.to_sym] = value
    end

    def to_h
      @options.to_h
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
      respond_to?(getter_name, true) ? send(getter_name, @options[name]) : @options[name]
    end

    def set(name, *args)
      @options.send(name, *args)
    end

    def method_missing(name, *args)
      args.any? ? set(name, *args) : get(name)
    end
  end
end