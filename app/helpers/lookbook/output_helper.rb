module Lookbook
  module OutputHelper
    def markdown(text = nil, &block)
      Lookbook::Markdown.render(block ? capture(&block) : text)
    end

    def highlight(source, **opts)
      Lookbook::CodeFormatter.highlight(source, **opts)
    end

    def beautify(source, **opts)
      Lookbook::CodeFormatter.beautify(source, **opts)
    end
  end
end
