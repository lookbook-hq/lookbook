module Lookbook
  module UI
    class Prose < BaseComponent
      attr_reader :size

      def initialize(markdown: true, size: :md, **kwargs)
        @size = size
        @markdown = markdown
      end

      def prose
        markdown? ? Markdown.render(content) : content
      end

      def markdown? = @markdown
    end
  end
end
