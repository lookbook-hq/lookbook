module Lookbook
  module UI
    class MarkdownPanel < BaseComponent
      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end

      def rendered_content
        Lookbook::Markdown.render(content).html_safe
      end
    end
  end
end
