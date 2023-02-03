module Lookbook
  class Button::Component < Lookbook::BaseComponent
    renders_one :icon, Lookbook::Icon::Component
    renders_one :dropdown

    ICON_SIZES = {
      xs: 3,
      sm: 3.5,
      md: 4,
      lg: 6
    }

    def initialize(id: nil, icon: nil, tooltip: nil, disabled: false, size: :md, href: nil, **html_attrs)
      @id = id
      @icon = icon
      @tooltip = tooltip
      @disabled = disabled
      @size = size
      @href = href
      super(**html_attrs)
    end

    def id
      @id ||= "button-#{(Time.now.to_f * 1000).to_i + rand(0..100)}"
    end

    def icon_size
      ICON_SIZES[@size]
    end

    def padding
      [:xs, :sm].include?(@size) ? "p-1" : "p-2"
    end

    def tag_name
      @href.present? ? :a : :button
    end

    def dropdown?
      dropdown.present?
    end

    protected

    def alpine_component
      "buttonComponent"
    end
  end
end
