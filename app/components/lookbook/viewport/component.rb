module Lookbook
  class Viewport::Component < Lookbook::Component
    def initialize(src, alpine_args, resize_height: true, resize_width: true, **html_attrs)
      @src = src
      @resize_height = resize_height
      @resize_width = resize_width
      @alpine_args = alpine_args
      super(**html_attrs)
    end

    def generate_id(*args)
      args.map { |args| args.delete_prefix("/").tr("&?=/_\-", "-") }.join("-")
    end

    protected

    def alpine_component
      "viewportComponent"
    end
  end
end
