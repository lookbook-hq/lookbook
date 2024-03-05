module Lookbook
  module UI
    class Code < BaseComponent
      attr_reader :language

      def initialize(language:)
        @language = language.to_s
      end

      def source
        CGI.escapeHTML(content || "").strip_heredoc.strip
      end
    end
  end
end
