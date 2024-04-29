module Lookbook
  module UI
    class Viewport < BaseComponent
      attr_reader :id, :src

      def initialize(id:, src:, srcdoc: nil, resize_x: true, resize_y: true, **kwargs)
        @id = id
        @src = src
        @srcdoc = srcdoc
        @resize_x = resize_x
        @resize_y = resize_y
      end

      def srcdoc
        @srcdoc&.gsub("&", "&amp;")&.gsub("\"", "&quot;")
      end

      def resize_x? = @resize_x

      def resize_y? = @resize_y
    end
  end
end
