module Lookbook
  class Viewport::Component < Lookbook::Component
    def initialize(src, alpine_args, resize_height: true, resize_width: true, **html_attrs)
      @src = src
      @resize_height = resize_height
      @resize_width = resize_width
      @alpine_args = alpine_args
      super(**html_attrs)
    end

    protected

    def alpine_component
      "viewportComponent"
    end
  end
end
