module Lookbook
  module UI
    class CodePanel < BaseComponent
      attr_reader :id, :language

      def initialize(id:, language:, **kwargs)
        @id = id
        @language = language
      end

      def copy_target_id
        "#{id}-copy-target"
      end

      def copy_source
        CGI.escapeHTML(content || "").strip_heredoc.strip
      end
    end
  end
end