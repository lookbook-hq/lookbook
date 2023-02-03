module LookbookDocs
  class Note::Component < Base
    renders_one :action, ->(href:, text:, icon: :arrow_right_circle, **attrs) do
      [tag.span(text, class: "ml-auto"), render(Icon::Component.new(name: icon, class: "ml-auto"))].join("\n")
    end

    ICONS = {
      tip: :lightbulb,
      warn: :alert_triangle,
      code: :code,
      link: :book_open
    }

    attr_reader :title, :theme

    def initialize(title: nil, theme: :tip, **attrs)
      @title = title
      @theme = theme
      @attrs = attrs
    end

    def icon_name
      ICONS[theme]
    end
  end
end
