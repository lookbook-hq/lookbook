module Lookbook
  class Icon::Component < Lookbook::Component
    def initialize(icon_name, size: 4, **html_attrs)
      @icon_name = icon_name.is_a?(Symbol) ? icon_name.to_s.tr("_", "-").to_json : icon_name
      @size = size || 4
      super(**html_attrs)
    end

    def size_rems
      "#{@size * 0.25}rem"
    end

    protected

    def alpine_args
      @icon_name
    end

    def alpine_component
      "iconComponent"
    end
  end
end
