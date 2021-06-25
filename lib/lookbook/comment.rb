
module Lookbook
  class Comment

    def initialize(content)
      @content = content
    end

    def to_html
      @content.present? ? Markdown.new(@content).to_html.html_safe : ""
    end

  end
end