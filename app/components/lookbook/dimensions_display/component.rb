module Lookbook
  class DimensionsDisplay::Component < Lookbook::BaseComponent
    def initialize(target:, **html_attrs)
      @target = target
      super(**html_attrs)
    end

    protected

    def alpine_data
      @target.to_json
    end

    def alpine_component
      "dimensionsDisplayComponent"
    end
  end
end
