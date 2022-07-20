require "lookbook/markdown"
require "lookbook/theme"
require "lookbook/store"

module Lookbook
  class Config
    def initialize
      @options = Store.new
      
      @options.set({
        project_name: "Lookbook",
        log_level: 2,
        auto_refresh: true,

        components_path: "app/components",
        
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
        listen_extensions: ["rb", "html.*"],
        listen_use_polling: false,

        cable_mount_path: "/lookbook-cable",
        cable_logger: Lookbook.logger,

        runtime_parsing: !Rails.env.production?,
        parser_registry_path: "tmp/storage/.yardoc",

        ui_theme: "indigo",
        ui_theme_overrides: {},

        hooks: {
          after_initialize: [],
          before_exit: [],
          after_change: [],
        },

        debug_menu: Rails.env.development?,

        experimental_features: false,

        inspector_panels: {
          preview: {
            pane: :main,
            position: 1,
            partial: "lookbook/previews/panels/preview",
            hotkey: "v",
            panel_classes: "overflow-hidden",
            padded: false,
            system: true
          },
          output: {
            pane: :main,
            position: 2,
            partial: "lookbook/previews/panels/output",
            label: "HTML",
            hotkey: "h",
            padded: false,
            system: true
          },
          source: {
            pane: :drawer,
            position: 1,
            partial: "lookbook/previews/panels/source",
            label: "Source",
            hotkey: "s",
            copy: ->(data) { data.examples.map { |e| e.source }.join("\n") },
            padded: false,
            system: true
          },
          notes: {
            pane: :drawer,
            position: 2,
            partial: "lookbook/previews/panels/notes",
            label: "Notes",
            hotkey: "n",
            disabled: ->(data) { data.examples.select { |e| e.notes.present? }.none? },
            padded: false,
            system: true
          },
          params: {
            pane: :drawer,
            position: 3,
            partial: "lookbook/previews/panels/params",
            label: "Params",
            hotkey: "p",
            disabled: ->(data) { data.preview.params.none? },
            padded: false,
            system: true
          }
        },

        inspector_panel_defaults: {
          id: ->(data) { "inspector-panel-#{data.name}" },
          partial: "lookbook/previews/panels/content",
          content: nil,
          label: ->(data) { data.name.titleize },
          pane: :drawer,
          position: ->(data) { data.index_position },
          hotkey: nil,
          disabled: false,
          show: true,
          copy: nil,
          panel_classes: nil,
          locals: {},
          padded: true,
          system: false
        },
      })
    end

    def project_name
      @options.project_name == false ? nil : @options.project_name
    end

    def components_path
      absolute_path(@options.components_path)
    end

    def page_paths
      normalize_paths(@options.page_paths)
    end

    def preview_paths
      normalize_paths(@options.preview_paths)
    end

    def listen_paths
      normalize_paths(@options.listen_paths)
    end

    def listen_extensions
      @options.listen_extensions += ["rb", "html.*"]
      @options.listen_extensions.uniq!
      @options.listen_extensions
    end

    def parser_registry_path
      absolute_path(@options.parser_registry_path)
    end

    def inspector_panels(&block)
      panels = Store.new(@options.inspector_panels.select { |key, panel| panel != false })
      if block_given?
        yield panels
      else
        panels
      end
    end

    def define_inspector_panel(name, opts = {})
      @options.inspector_panels[name] = opts
      if opts[:position].present?
        pane = inspector_panels[name].pane.presence || :drawer
        siblings = inspector_panels.select do |key, panel|
          panel.pane == pane && key != name.to_sym
        end
        siblings.each do |key, panel|
          if panel.position >= opts[:position]
            panel.position += 1
          end
        end
      end
    end

    def amend_inspector_panel(name, opts = {})
      if opts == false
        @options.inspector_panels[name] = false
      else
        @options.inspector_panels[name].merge!(opts)
      end
    end

    def remove_inspector_panel(name)
      amend_inspector_panel(name, false)
    end

    def ui_theme=(name)
      name = name.to_s
      if Theme.valid_theme?(name)
        @options.ui_theme = name
      else
        Lookbook.logger.warn "'#{name}' is not a valid Lookbook theme. Theme setting not changed."
      end
    end

    def ui_theme_overrides(&block)
      if block_given?
        yield @options.ui_theme_overrides
      else
        @options.ui_theme_overrides
      end
    end

    def [](key)
      if respond_to? key.to_sym
        public_send(key.to_sym)
      else
        @options[key.to_sym]
      end
    end

    def []=(key, value)
      setter_key = "#{key}=".to_sym
      if respond_to? setter_key
        public_send(setter_key, value)
      else
        @options[key.to_sym] = value
      end
    end

    def to_h
      @options.to_h
    end

    def to_json(*a)
      to_h.to_json(*a)
    end
    
    protected

    def normalize_paths(paths)
      paths.map! { |path| absolute_path(path) }
      paths.select! { |path| Dir.exist?(path) }
      paths
    end

    def absolute_path(path)
      File.absolute_path(path.to_s, Rails.root)
    end

    def method_missing(name, *args)
      @options.send(name, *args)
    end
  end
end