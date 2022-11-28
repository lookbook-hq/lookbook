module Lookbook
  class Embed::Inspector::Component < Lookbook::BaseComponent
    attr_reader :target, :context

    def initialize(example:, context: nil, options: nil, **html_attrs)
      @target = example
      @context = context.to_h
      @options = options.to_h
      super(**html_attrs)
    end

    def id
      Utils.id("embed", target.id, "inspector")
    end

    def options
      @_options ||= Lookbook.config.preview_embed_options.to_h.merge(@options)
    end

    def data
      context.fetch(:data, Store.new)
    end

    def params
      context.fetch(:params, {}).to_h
    end

    def dynamic_display_options
      context.fetch(:dynamic_display_options, {}).to_h
    end

    def static_display_options
      context.fetch(:static_display_options, {}).to_h
    end

    def display_action?(name)
      actions.include?(name)
    end

    def actions
      options.fetch(:actions, []).map(&:to_sym)
    end

    def panels
      @_panels ||= panels_config(options[:panels])
    end

    def display_option_controls?
      options.fetch(:display_option_controls, true)
    end

    def drawer?
      options.fetch(:drawer, false) && panels.any?
    end

    protected

    def panels_config(panel_names)
      panel_names.to_a.map do |panel_name|
        config = Engine.panels.get_panel(panel_name.to_sym)
        PanelStore.resolve_config(config, data) if config
      end.compact
    end

    def lookbook_inspect_path(*args)
      Engine.routes.url_helpers.lookbook_inspect_path(*args)
    end

    def lookbook_preview_path(*args)
      Engine.routes.url_helpers.lookbook_preview_path(*args)
    end

    def alpine_data
      [alpine_encode(id), "$store.pages.embeds"].join(",")
    end

    def alpine_component
      "embedInspectorComponent"
    end
  end
end
