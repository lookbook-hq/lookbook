require "redcarpet"

module Lookbook
  class MarkdownRenderer < Redcarpet::Render::HTML
    HTML_ELEMENT_MATCHER = /^(<([a-z\-]+)(?:\s[^>]*)?>((?:(?!<\/([a-z\-]+)>).)*)<\/([a-z\-]+)>)$/m

    def block_code(source, lang = "ruby")
      line_numbers = lang.to_s.end_with? "-numbered"
      template = "<%= lb_code(source, lang: lang, line_numbers: line_numbers) %>"
      ApplicationController.render(
        inline: template,
        locals: {
          source: source,
          lang: lang.to_s.chomp("-numbered"),
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
