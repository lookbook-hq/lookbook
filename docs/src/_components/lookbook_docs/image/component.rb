module LookbookDocs
  class Image::Component < Base
    attr_reader :path

    def initialize(path:, **attrs)
      @path = path
      @attrs = attrs
    end

    def image_path
      "/images/#{path}"
    end

    def call
      tag.img src: image_path, **html_attrs
    end
  end
end
