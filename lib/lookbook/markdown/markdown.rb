require "redcarpet"

module Lookbook
  module Markdown
    class << self
      def render(text = nil, **kwargs, &block)
        content = text || block.call
        renderer(kwargs).render(WhitespaceStripper.call(content.to_s)).html_safe
      end

      private

      def renderer(opts = {})
        options = Lookbook.config.default_markdown_options.to_h.deep_merge(opts)
        Redcarpet::Markdown.new(MarkdownRenderer, options)
      end
    end
  end
end
