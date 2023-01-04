module LookbookDocs
  class Screenshot::Component < Base
    attr_reader :alt

    def initialize(src:, alt: nil, **attrs)
      @src = src
      @alt = alt
      @attrs = attrs
    end

    def src
      "/images/screenshots/#{@src}"
    end
  end
end
