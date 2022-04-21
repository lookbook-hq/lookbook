module Lookbook
  class Filter::Component < Lookbook::Component
    def initialize(store, placeholder: "Type to filter&hellip;", **html_attrs)
      @model = "#{store}.raw"
      @placeholder = placeholder
      super(store, **html_attrs)
    end

    protected

    def alpine_component
      "filterComponent"
    end
  end
end
