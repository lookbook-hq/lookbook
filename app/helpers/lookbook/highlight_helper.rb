require 'rouge'

module Lookbook
  module HighlightHelper
    def highlight(source, language)
      formatter = Rouge::Formatters::HTML.new(css_class: 'highlight')
      lexer = Rouge::Lexer.find(language)
      formatter.format(lexer.lex(source)).html_safe
    end
  end
end