module Lookbook
  class ViewportComponent < Component
    attr_reader :src

    def initialize(id:, src:, resize_x: true, resize_y: true, **kwargs)
      @src = src
      @resize_x = resize_x
      @resize_y = resize_y

      super(id: id, **kwargs)
    end

    def resize_x?
      @resize_x
    end

    def resize_y?
      @resize_y
    end
  end
end
