module Lookbook
  module OutputHelper
    def markdown(text = nil, &block)
      MarkdownRenderer.call(block ? capture(&block) : text, Lookbook.config.markdown_options)
    end

    def highlight(*args, **opts)
      CodeHighlighter.call(*args, **opts)
    end

    def beautify(*args, **opts)
      CodeBeautifier.call(*args, **opts)
    end

    def pretty_json(obj)
      JSON.pretty_generate(obj)
    end
  end
end
