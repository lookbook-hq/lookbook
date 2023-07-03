require "redcarpet"

module Lookbook
  class MarkdownTocRenderer < Service
    attr_reader :text

    def initialize(text)
      @text = text
    end

    def call
      clean_text = ActionViewAnnotationsStripper.call(text)
      renderer = Redcarpet::Render::HTML_TOC.new(with_toc_data: true)
      Redcarpet::Markdown.new(renderer).render(clean_text).html_safe
    end
  end
end
