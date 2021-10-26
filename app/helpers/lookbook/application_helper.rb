require "redcarpet"
require "rouge"

module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end

    def markdown(text)
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, {
        tables: true,
        fenced_code_blocks: true,
        disable_indented_code_blocks: true,
      })
      markdown.render(text).html_safe
    end

    def highlight(source, language)
      formatter = Rouge::Formatters::HTML.new(css_class: "highlight")
      lexer = Rouge::Lexer.find(language)
      formatter.format(lexer.lex(source)).html_safe
    end

    def nav_padding_style(depth)
      "padding-left: calc((#{depth - 1} * 12px) + 0.5rem);"
    end
  end
end
