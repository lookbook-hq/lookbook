module Lookbook
  module UI
    class Code < BaseComponent
      attr_reader :language

      def initialize(language:)
        @language = language.to_s
      end

      def source
        WhitespaceStripper.call(CGI.escapeHTML(content.to_s))
      end
    end
  end
end
