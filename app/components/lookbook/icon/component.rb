module Lookbook
  class Icon::Component < Lookbook::BaseComponent
    def initialize(name:, size: 4, **html_attrs)
      @alpine_data = name.is_a?(Symbol) ? alpine_encode(name.to_s.tr("_", "-")) : name
      @size = size || 4
      super(**html_attrs)
    end

    def size_rems
      "#{@size * 0.25}rem"
    end

    protected

    def alpine_component
      "iconComponent"
    end
  end
end
