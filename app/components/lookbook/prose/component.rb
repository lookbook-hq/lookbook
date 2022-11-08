module Lookbook
  class Prose::Component < Lookbook::BaseComponent
    include Lookbook::OutputHelper

    def initialize(size: :md, markdown: true, theme: nil, invert_colors: false, **html_attrs)
      @size = size
      @markdown = markdown
      @theme = theme
      @invert_colors = invert_colors
      super(**html_attrs)
    end

    def rendered_content
      @markdown ? markdown(content.strip_heredoc) : helpers.raw(content)
    end

    def theme_classname
      "prose-#{@theme}"
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

    def before_render
      @theme ||= (config.prose_options && config.prose_options[:theme]&.to_sym) || :gray
      @invert_colors ||= ActiveModel::Type::Boolean.new.cast((config.prose_options && config.prose_options[:invert_colors]) || false)
    end
  end
end
