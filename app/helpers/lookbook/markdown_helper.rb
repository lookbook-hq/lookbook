require 'redcarpet'

module Lookbook
  module MarkdownHelper
    def markdown(text)
      Markdown.new(text).to_html.html_safe
    end
  end
end