module Lookbook
  class CopyButton::Component < Lookbook::Component
    def initialize(target:, icon: :code, **attrs)
      @icon = icon
      @target = target
      @button_attrs = attrs
    end

    def icon_size
      Lookbook::Button::Component::ICON_SIZES[@size]
    end

    protected

    def alpine_data
      content ? nil : @target.to_json
    end

    def alpine_component
      "copyButtonComponent"
    end
  end
end
