require "redcarpet"

module Lookbook
  class MarkdownWithTocRenderer < MarkdownRenderer
    def call
      render_toc + "<hr>".html_safe + render_content
    end

    private

    def render_content
      md_renderer = Redcarpet::Markdown.new(LookbookMarkdownRenderer.new(with_toc_data: true), opts)
      md_renderer.render(clean_text).html_safe
    end

    def render_toc
      toc_renderer = Redcarpet::Markdown.new(Redcarpet::Render::HTML_TOC.new)
      toc_renderer.render(clean_text).html_safe
    end

    def clean_text
      @_clean_text ||= ActionViewAnnotationsStripper.call(text)
    end
  end
end
