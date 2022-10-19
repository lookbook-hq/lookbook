module Lookbook
  module OutputHelper
    def markdown(text = nil, &block)
      MarkdownRenderer.call(block ? capture(&block) : text, Lookbook.config.markdown_options)
    end

    def highlight(source, **opts)
      Lookbook::CodeFormatter.highlight(source, **opts)
    end

    def beautify(source, **opts)
      Lookbook::CodeFormatter.beautify(source, **opts)
    end

    def pretty_json(obj)
      JSON.pretty_generate(obj)
    end
  end
end
