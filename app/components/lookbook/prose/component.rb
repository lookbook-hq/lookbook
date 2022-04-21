module Lookbook
  class Prose::Component < Lookbook::Component
    def initialize(size: :md, markdown: true, **html_attrs)
      @size = size
      @markdown = markdown
      super(**html_attrs)
    end

    def rendered_content
      @markdown ? helpers.markdown(content) : content
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
