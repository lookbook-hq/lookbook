module Lookbook
  module UI
    class Code < BaseComponent
      attr_reader :lang

      def initialize(source: nil, lang: :html, line_numbers: false, prettify: true)
        @source = source.to_s
        @lang = lang.to_s
        @line_numbers = line_numbers
        @prettify = prettify
      end

      def source
        escaped_source = CGI.escapeHTML(@source)
        WhitespaceStripper.call(escaped_source).html_safe
      end

      def line_numbers? = @line_numbers

      def prettify? = @prettify
    end
  end
end
