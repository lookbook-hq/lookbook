module LookbookDocs
  class Button::Component < Base
    attr_reader :text, :href, :icon, :icon_position, :theme, :size

    def initialize(text: nil, href: nil, icon: nil, icon_position: :before, theme: :primary, size: :md, **attrs)
      @text = text
      @href = href
      @icon = icon
      @icon_position = icon_position
      @theme = theme
      @size = size
      @attrs = attrs
    end

    def tag_type
      href ? :a : :button
    end
  end
end
