module Lookbook
  class RenderedPreviewExampleEntity
    # Represents a **rendered** preview example
    #
    # @ignore methods
    # @api public
    delegate_missing_to :example

    attr_reader :example

    def initialize(example, output, params)
      @example = example
      @params = params
      @output = output
    end

    def source
      has_custom_template? ? template_source(template) : example.source
    end

    def source_lang
      has_custom_template? ? template_lang(template) : example.source_lang
    end

    def output
      @_output ||= CodeBeautifier.call(@output)
    end

    protected

    attr_reader :params

    def render_args
      @_render_args ||= preview.render_args(example.name, params: params)
    end

    def template
      render_args[:template]
    end

    def view?
      render_args[:type] == :view
    end

    def has_custom_template?
      template != Lookbook.config.preview_template && !custom_source? && !view?
    end
  end
end
