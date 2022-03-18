module Lookbook
  class Markdown
    def self.render(text)
      markdown = Redcarpet::Markdown.new(Renderer, {
        tables: true,
        fenced_code_blocks: true,
        disable_indented_code_blocks: true,
        strikethrough: true,
        highlight: true,
        with_toc_data: true
      })
      markdown.render(text).html_safe
    end

    def self.highlight(source, language = nil, opts = {})
      source&.gsub!("&gt;", "<")&.gsub!("&lt;", ">")
      language ||= "ruby"
      formatter = Lookbook::CodeFormatter.new(opts)
      lexer = Rouge::Lexer.find(language)
      formatter.format(lexer.lex(source)).html_safe
    end

    class Renderer < Redcarpet::Render::HTML
      def block_code(code, language)
        "<pre class='code'><code class='highlight'>#{Markdown.highlight(code.strip, language)}</code></pre>".html_safe
      end
    end
  end
end
