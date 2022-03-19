require "rouge"
require "htmlbeautifier"

module Lookbook
  module CodeFormatter
    class << self
      def highlight(source, language, opts = {})
        source&.gsub!("&gt;", "<")&.gsub!("&lt;", ">")
        language ||= "ruby"
        formatter = Formatter.new(opts)
        lexer = Rouge::Lexer.find(language.to_s) || Rouge::Lexer.find("plaintext")
        formatter.format(lexer.lex(source)).html_safe
      end

      def beautify(source, language = "html")
        source = source.strip
        result = language.downcase == "html" ? HtmlBeautifier.beautify(source) : source
        result.strip.html_safe
      end
    end
  end

  class Formatter < Rouge::Formatters::HTML
    def initialize(opts = {})
      @opts = opts
    end

    def stream(tokens, &block)
      token_lines(tokens).each_with_index do |line_tokens, i|
        yield "<div class='line'>"
        yield "<span class='line-number'>#{i}</span>" if @opts[:line_numbers]
        yield "<span class='line-content'>"
        line_tokens.each do |token, value|
          yield span(token, value)
        end
        yield "</span>"
        yield "</div>"
      end
    end
  end
end
