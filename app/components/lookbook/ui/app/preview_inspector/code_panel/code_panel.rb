module Lookbook
  module UI
    class CodePanel < BaseComponent
      attr_reader :id, :lang

      def initialize(id:, lang:, **kwargs)
        @id = id
        @lang = lang
      end

      def copy_target_id
        "#{id}-copy-target"
      end

      def copy_source
        escaped_source = CGI.escapeHTML(content.to_s)
        WhitespaceStripper.call(escaped_source).html_safe
      end
    end
  end
end
