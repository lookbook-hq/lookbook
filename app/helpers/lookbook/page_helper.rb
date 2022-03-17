module Lookbook
  module PageHelper
    def markdown(text = nil, &block)
      Lookbook::Markdown.render(block ? capture(&block) : text)
    end

    def code(source = nil, language = "ruby", opts = {}, &block)
      source = block ? capture(&block) : source
      "<pre><code class='highlight'>#{Lookbook::Markdown.highlight(source.strip, language, opts)}</code></pre>".html_safe
    end

    def embed(path, params: {}, type: :preview, **opts)
      @embed_counter ||= 0
      html = render "lookbook/embeds/#{type}", {
        id: "embed#{url_for}-#{path}-#{type}-#{@embed_counter}".tr("/", "-"),
        path: path,
        params: params,
        opts: opts
      }
      @embed_counter += 1
      html
    end
  end
end
