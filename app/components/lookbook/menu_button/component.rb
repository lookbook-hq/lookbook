module Lookbook
  class MenuButton::Component < Lookbook::Component
    renders_many :sections

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
