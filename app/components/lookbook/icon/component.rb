module Lookbook
  class Icon::Component < Lookbook::BaseComponent
    attr_reader :stroke

    def initialize(name:, size: 4, stroke: 2, **html_attrs)
      @alpine_data = name.is_a?(Symbol) ? alpine_encode(name.to_s.tr("_", "-")) : name
      @size = size || 4
      @stroke = stroke
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
