require "redcarpet"

module Lookbook
  class Markdown
    DEFAULT_OPTIONS = {
      tables: true,
      fenced_code_blocks: true,
      disable_indented_code_blocks: true,
      strikethrough: true,
      highlight: true,
      with_toc_data: true
    }

    def self.render(text)
      markdown = Redcarpet::Markdown.new(Renderer, Lookbook.config.markdown_options)
      markdown.render(text).html_safe
    end

    class Renderer < Redcarpet::Render::HTML
      def block_code(code, language = "ruby")
        line_numbers = language.to_s.end_with? "-numbered"
        ApplicationController.render "lookbook/components/_code", locals: {
          code: code,
          language: language.to_s.chomp("-numbered"),
          line_numbers: line_numbers
        },
        layout: nil
      end
    end
  end
end
