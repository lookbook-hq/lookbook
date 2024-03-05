require "redcarpet"

module Lookbook
  module Markdown
    class << self
      def render(text = nil, **kwargs, &block)
        content = text || block.call
        renderer(kwargs).render(content.to_s.strip_heredoc.strip)
      end

      private

      def renderer(opts = {})
        options = Lookbook.config.default_markdown_options.to_h.deep_merge(opts)
        Redcarpet::Markdown.new(MarkdownRenderer, options)
      end
    end
  end
end
