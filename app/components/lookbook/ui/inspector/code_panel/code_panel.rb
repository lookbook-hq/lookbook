module Lookbook
  module UI
    class CodePanel < BaseComponent
      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
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
