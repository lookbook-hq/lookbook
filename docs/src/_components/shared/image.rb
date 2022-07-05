module Shared
  class Image < Shared::Base
    def initialize(path:, **attrs)
      @path = path
      @attrs = attrs
    end

    def image_path
      "/images/#{@path}"
    end

    def call
      tag.img src: image_path, **@attrs
    end
  end
end