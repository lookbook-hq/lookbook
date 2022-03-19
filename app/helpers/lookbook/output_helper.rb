module Lookbook
  module OutputHelper
    def markdown(text = nil, &block)
      Lookbook::Markdown.render(block ? capture(&block) : text)
    end

    def highlight(source, language, opts = {})
      Lookbook::CodeFormatter.highlight(source, language, opts)
    end

    def beautify(source, language = "html")
      Lookbook::CodeFormatter.beautify(source, language)
    end
  end
end
