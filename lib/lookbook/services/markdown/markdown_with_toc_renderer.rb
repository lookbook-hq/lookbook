require "redcarpet"

module Lookbook
  class MarkdownWithTocRenderer < MarkdownRenderer
    def call
      html = super
      toc_html = MarkdownTocRenderer.call(text)
      toc_html + "<hr>".html_safe + html
    end
  end
end
