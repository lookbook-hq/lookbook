require "rouge"

module Lookbook
  module Syntax
    class Formatter < Rouge::Formatters::HTML
      def stream(tokens, &block)
        token_lines(tokens).each do |line_tokens|
          yield %(<div class="line">)
          line_tokens.each do |token, value|
            yield span(token, value)
          end
          yield "</div>"
        end
      end
    end
  end
end
