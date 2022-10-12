require "css_parser"

module Lookbook
  class InspectorPanel::Component < Lookbook::BaseComponent
    attr_reader :panel_styles, :panel_html

    def initialize(name:, **attrs)
      @name = name
      super(**attrs)
    end

    def id
      AttributeUtils.dom_id("panel", @name)
    end

    def before_render
      tpl = TemplateParser.new(content)
      @panel_styles = tpl.styles.map { |s| "##{id} #{s}" }.join("\n")
      @panel_html = tpl.content
    end
  end
end
