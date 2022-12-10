module LookbookDocs
  class Note::Component < Base
    ICONS = {
      info: :bell,
      warn: :alert_triangle
    }

    attr_reader :title, :theme

    def initialize(title: nil, theme: :info, **attrs)
      @title = title
      @theme = theme
      @attrs = attrs
    end

    def icon_name
      ICONS[theme]
    end
  end
end
