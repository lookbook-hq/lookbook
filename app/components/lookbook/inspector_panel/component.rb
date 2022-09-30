require "css_parser"

module Lookbook
  class InspectorPanel::Component < Lookbook::BaseComponent
    attr_reader :panel_styles, :panel_html, :id

    def initialize(id:, name:, **attrs)
      @id = id
      @name = name
      @system = attrs[:system] || false
      super(**attrs.except(:system))
    end

    def before_render
      if @system == false
        tpl = TemplateParser.new(content)
        @panel_styles = tpl.styles.map { |s| "##{id} #{s}" }.join("\n")
        @panel_html = tpl.content
      end
      @panel_html ||= content
    end
  end
end
