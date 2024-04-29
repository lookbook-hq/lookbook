module Lookbook
  module UI
    class Code < BaseComponent
      attr_reader :lang

      def initialize(source: nil, lang: :html, line_numbers: false, **kwargs)
        @source = source.to_s
        @lang = lang.to_s
        @line_numbers = line_numbers
      end

      def source
        escaped_source = CGI.escapeHTML(content || @source)
        WhitespaceStripper.call(escaped_source).html_safe
      end

      def line_numbers? = @line_numbers
    end
  end
end
