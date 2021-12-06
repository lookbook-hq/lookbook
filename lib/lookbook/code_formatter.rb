module Lookbook
  class CodeFormatter < Rouge::Formatters::HTML
    def initialize(opts = {})
      @opts = opts
    end

    def stream(tokens, &block)
      token_lines(tokens).each_with_index do |line_tokens, i|
        yield "<div class='line'>"
        yield "<div class='line-number'>#{i}</div>" if @opts[:line_numbers]
        yield "<div class='line-content'>"
        line_tokens.each do |token, value|
          yield span(token, value)
        end
        yield "</div>"
        yield "</div>"
      end
    end
  end
end
