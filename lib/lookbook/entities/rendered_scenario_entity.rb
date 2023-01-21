module Lookbook
  # Represents a **rendered** preview scenario
  #
  # @ignore methods
  # @api public
  class RenderedScenarioEntity
    delegate_missing_to :scenario

    attr_reader :scenario

    def initialize(scenario, output, params)
      @scenario = scenario
      @params = params
      @output = output
    end

    def source
      has_custom_template? ? template_source(template) : scenario.source
    end

    def source_lang
      has_custom_template? ? template_lang(template) : scenario.source_lang
    end

    def output
      @_output ||= CodeBeautifier.call(@output)
    end

    protected

    attr_reader :params

    def render_args
      @_render_args ||= preview.render_args(scenario.name, params: params)
    end

    def template
      render_args[:template]
    end

    def view?
      render_args[:type] == :view
    end

    def has_custom_template?
      !template.in?(system_templates) && !custom_source? && !view?
    end

    def system_templates
      ["view_components/preview", Lookbook.config.preview_template]
    end
  end
end
