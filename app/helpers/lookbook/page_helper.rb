module Lookbook
  module PageHelper
    def markdown(text = nil, &block)
      Lookbook::Markdown.render(block ? capture(&block) : text)
    end

    def code(source = nil, language = "ruby", opts = {}, &block)
      source = block ? capture(&block) : source
      "<pre><code class='highlight'>#{Lookbook::Markdown.highlight(source.strip, language, opts)}</code></pre>".html_safe
    end
  end
end
