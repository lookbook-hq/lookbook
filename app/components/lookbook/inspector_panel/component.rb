require "css_parser"

module Lookbook
  class InspectorPanel::Component < Lookbook::BaseComponent
    attr_reader :panel_styles, :panel_html, :id

    def initialize(id:, name:, system: false, **html_attrs)
      @id = id
      @name = name
      @system = system
      @panel_html = nil
      @panel_styles = nil
      super(**html_attrs)
    end

    def before_render
      if @system == false
        panel_dom = ::Nokogiri::HTML::fragment(content)
        style_tags = panel_dom.css('style')
        if style_tags.any?
          css_parser = ::CssParser::Parser.new
          @panel_styles = ""
          style_tags.each do |style_tag|
            css_parser.load_string! style_tag.text
            css_parser.each_selector do |selector, declarations, specificity|
              @panel_styles += "##{id} #{selector} { #{declarations} }\n"
            end
            style_tag.unlink
          end
          @panel_html = panel_dom.to_html.html_safe
        end
      else
        @panel_html = content
      end
    end
  end
end
