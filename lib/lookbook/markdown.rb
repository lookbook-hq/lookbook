require "redcarpet"

module Lookbook
  class Markdown
    def self.render(text)
      Utils.strip_action_view_annotations!(text)
      markdown = Redcarpet::Markdown.new(Renderer, Lookbook.config.markdown_options.to_h)
      markdown.render(text).html_safe
    end

    class Renderer < Redcarpet::Render::HTML
      def block_code(code, language = "ruby")
        line_numbers = language.to_s.end_with? "-numbered"
        ApplicationController.render(Lookbook::Code::Component.new(**{
          source: code,
          language: language.to_s.chomp("-numbered"),
          line_numbers: line_numbers
        }), layout: nil)
      end
    end
  end
end
