module Lookbook
  module UI
    class Code < BaseComponent
      attr_reader :language

      def initialize(source: nil, language: :html, line_numbers: false)
        @source = source.to_s
        @language = language.to_s
        @line_numbers = line_numbers
      end

      def source
        escaped_source = CGI.escapeHTML(@source)
        WhitespaceStripper.call(escaped_source).html_safe
      end

      def line_numbers? = @line_numbers
    end
  end
end
