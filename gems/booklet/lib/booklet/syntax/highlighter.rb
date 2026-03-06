# frozen_string_literal: true

require "rouge"

module Booklet
  module Syntax
    class Highlighter < Booklet::Object
      prop :theme, String, default: "github-light-default"

      def highlight(code, lang: :plaintext, theme: nil)
        lex_result = lexer(lang).lex(code.to_s)
        CGI.escapeHTML(formatter.format(lex_result))
      end

      protected def lexer(lang)
        Rouge::Lexer.find(lang.to_s) || Rouge::Lexer.find("plaintext")
      end

      protected def formatter
        Formatter.new
      end
    end
  end
end
