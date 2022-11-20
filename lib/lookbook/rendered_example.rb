module Lookbook
  class RenderedExample
    delegate_missing_to :example

    attr_reader :output, :example

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

    protected

    attr_reader :params

    def render_args
      @_render_args ||= preview.render_args(example.name, params: params)
    end

    def template
      render_args[:template]
    end

    def has_custom_template?
      template != "view_components/preview" && !custom_source?
    end
  end
end
