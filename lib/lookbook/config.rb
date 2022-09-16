require "lookbook/markdown"
require "lookbook/theme"
require "lookbook/store"

module Lookbook
  class Config
    def initialize
      @options = Store.new({}, true)

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
        preview_srcdoc: nil,
        preview_tags: {},
        preview_disable_action_view_annotations: true,
        sort_examples: false,

        listen: Rails.env.development?,
        listen_paths: [],
        listen_extensions: ["rb", "html.*"],
        listen_use_polling: false,

        cable_mount_path: "/cable",

        parser_registry_path: "tmp/storage/.yardoc",

        ui_theme: "indigo",
        ui_theme_overrides: {},
        ui_favicon: true,

        hooks: {
          after_initialize: [],
          before_exit: [],
          after_change: []
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
        }
      })
    end

    def runtime_parsing=(value)
      Lookbook.logger.warn "The `runtime_parsing` config option has been deprecated and will be removed in v2.0"
    end

    def project_name
      @options.project_name == false ? nil : @options.project_name
    end

    def components_path
      absolute_path(@options.components_path)
    end

    def page_paths=(paths = [])
      @options.page_paths += paths if paths.is_a? Array
    end

    def page_paths
      normalize_paths(@options.page_paths)
    end

    def preview_paths=(paths = [])
      @options.preview_paths += paths if paths.is_a? Array
    end

    def preview_paths
      normalize_paths(@options.preview_paths)
    end

    def preview_srcdoc=(enable)
      Lookbook.logger.warn "The `preview_srcdoc` config option is deprecated and will be removed in v2.0"
    end

    def listen_paths
      normalize_paths(@options.listen_paths)
    end

    def listen_extensions=(extensions = [])
      @options.listen_extensions += extensions if extensions.is_a? Array
      @options.listen_extensions.uniq!
    end

    def parser_registry_path
      absolute_path(@options.parser_registry_path)
    end

    def inspector_panels(&block)
      panels = Store.new(@options.inspector_panels.select { |key, panel| panel != false })
      if block
        yield panels
      else
        panels
      end
    end

    def define_inspector_panel(name, opts = {})
      pane = opts[:pane].presence || :drawer
      siblings = inspector_panels.select { |key, panel| panel.pane == pane }
      opts[:position] ||= siblings.size + 1
      @options.inspector_panels[name] = opts
      siblings.each do |key, panel|
        if panel.position >= opts[:position]
          panel.position += 1
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

    def inspector_panel_defaults
      {
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
        system: false
      }
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
      if block
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
      paths.map! do |path|
        full_path = absolute_path(path)
        full_path if Dir.exist?(full_path)
      end.compact!
      paths
    end

    def absolute_path(path)
      File.absolute_path(path.to_s, Rails.root)
    end

    def method_missing(name, *args)
      @options.send(name, *args)
    end

    def respond_to_missing?(name, *)
      to_h.key? name
    end
  end
end
