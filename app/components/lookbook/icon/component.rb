module Lookbook
  class Icon::Component < Lookbook::Component
    def initialize(name:, size: 4, **html_attrs)
      @icon_name = name.is_a?(Symbol) ? name.to_s.tr("_", "-").to_json : name
      @size = size || 4
      super(**html_attrs)
    end

    def size_rems
      "#{@size * 0.25}rem"
    end

    protected

    def alpine_data
      @icon_name
    end

    def alpine_component
      "iconComponent"
    end
  end
end
