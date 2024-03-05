require "redcarpet"

module Lookbook
  module Markdown
    class << self
      def render(text = nil, **kwargs, &block)
        renderer(kwargs).render(text || block.call)
      end

      private

      def renderer(opts = {})
        options = Lookbook.config.default_markdown_options.to_h.deep_merge(opts)
        Redcarpet::Markdown.new(MarkdownRenderer, options)
      end
    end
  end
end
