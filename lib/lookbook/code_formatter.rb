module Lookbook
  class CodeFormatter < Rouge::Formatters::HTML
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
