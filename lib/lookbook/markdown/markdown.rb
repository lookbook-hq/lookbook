require "redcarpet"

module Lookbook
  module Markdown
    class << self
      def render(text = nil, **kwargs, &block)
        content = text || block&.call
        renderer(kwargs).render(WhitespaceStripper.call(content)).html_safe
      end

      def markdown_file?(path)
        !!path.to_s.match?(/(.+[^\.])\.(md|md\..+)/)
      end

      private

      def renderer(opts = {})
        options = Lookbook.config.markdown_options.to_h.deep_merge(opts)
        Redcarpet::Markdown.new(MarkdownRenderer, options)
      end
    end
  end
end
