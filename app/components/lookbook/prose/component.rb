module Lookbook
  class Prose::Component < Lookbook::BaseComponent
    include Lookbook::OutputHelper

    def initialize(size: :md, markdown: true, **html_attrs)
      @size = size
      @markdown = markdown
      super(**html_attrs)
    end

    def rendered_content
      @markdown ? markdown(content.strip_heredoc) : helpers.raw(content)
    end

    def size_class
      case @size
      when :sm
        "prose-sm"
      when :lg
        "prose-lg"
      else
        ""
      end
    end
  end
end
