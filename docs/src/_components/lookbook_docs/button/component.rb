module LookbookDocs
  class Button::Component < Base
    attr_reader :text, :href, :icon

    def initialize(text: nil, href: nil, icon: nil, **attrs)
      @text = text
      @href = href
      @icon = icon
      @attrs = attrs
    end

    def tag_type
      href ? :a : :button
    end
  end
end
