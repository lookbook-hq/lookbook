module Lookbook
  module UI
    class Code < BaseComponent
      def source
        CGI.escapeHTML(content || "").strip_heredoc.strip
      end
    end
  end
end
