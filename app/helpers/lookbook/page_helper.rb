module Lookbook
  module PageHelper
    def icon(name = nil, size: 4, **attrs)
      render "lookbook/components/icon",
        name: name,
        size: size,
        classes: class_names(attrs[:class]),
        **attrs.except(:class)
    end

    def markdown(text = nil, &block)
      Lookbook::Markdown.render(block ? capture(&block) : text)
    end

    def code(*args, **opts, &block)
      if block
        source = capture(&block)
        language = args[0]
      else
        source, language = args
      end
      "<pre class='code'><code class='highlight'>#{Lookbook::Markdown.highlight(source.strip, (language || :ruby).to_s, opts)}</code></pre>".html_safe
    end

    def embed(*args, params: {}, type: :preview, **opts)
      @embed_counter ||= 0
      preview, example = Lookbook::Api.find_preview_and_example(*args)
      if example
        html = render "lookbook/components/embed", {
          id: "embed#{url_for}-#{example.path}-#{@embed_counter}".tr("/", "-"),
          preview: preview,
          example: example,
          params: params,
          opts: opts
        }
        @embed_counter += 1
        html
      else
        render "lookbook/components/embed_not_found", {
          opts: opts
        }
      end
    end
  end
end
