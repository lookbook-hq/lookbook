module Lookbook
  class Embed::Inspector::Component < Lookbook::BaseComponent
    attr_reader :id, :target, :panels, :context, :options

    def initialize(example:, id: nil, panels: nil, context: nil, options: nil, **html_attrs)
      @id = id || Utils.id("embed", example.id)
      @target = example
      @panels = panels.to_a
      @context = context.to_h
      @options = options.to_h
      super(**html_attrs)
    end

    def data
      context.fetch(:data, {}).to_h
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

    def show_links?
      options.fetch(:show_links, true)
    end

    def max_height
      options.fetch(:max_height, nil)
    end

    protected

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
