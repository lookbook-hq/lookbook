module Lookbook
  module UI
    class TabPanel < BaseComponent
      attr_reader :name, :panel_html, :panel_styles

      before_render do
        styles, html = StylesExtractor.call(content)
        @panel_styles = styles.map { |s| "[data-panel=\"#{name}\"] #{s}" }.join("\n")
        @panel_html = html.html_safe
      end

      def initialize(name:, **kwargs)
        @name = name
      end
    end
  end
end
