require "redcarpet"

module Lookbook
  class MarkdownRenderer < Redcarpet::Render::HTML
    HTML_ELEMENT_MATCHER = /^<.*>.*<\/.*>/m

    def block_code(source, language = "ruby")
      line_numbers = language.to_s.end_with? "-numbered"
      template = "<%= lookbook_code(source, language: language, line_numbers: line_numbers) %>"
      ApplicationController.render(
        inline: template,
        locals: {
          source: source,
          language: language.to_s.chomp("-numbered"),
          line_numbers: line_numbers
        },
        layout: nil
      )
    end

    def paragraph(content)
      if HTML_ELEMENT_MATCHER.match?(content.strip)
        content.html_safe
      else
        "<p>#{content}</p>".html_safe
      end
    end
  end
end
