module Lookbook
  class MenuButton::Component < Lookbook::Button::Component
    renders_many :items, ->(**attrs, &block) do
      render Lookbook::MenuButton::MenuItem::Component.new(**attrs), &block
    end

    def initialize(**attrs)
      @button_attrs = attrs
      super
    end

    protected

    def alpine_component
      "menuButtonComponent"
    end
  end
end
