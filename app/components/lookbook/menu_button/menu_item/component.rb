module Lookbook
  class MenuButton::MenuItem::Component < Lookbook::Component
    def initialize(href: nil, label: nil, icon: nil, **button_attrs)
      @href = href
      @label = label
      @icon = icon
      @button_attrs = button_attrs
      super
    end
  end
end
