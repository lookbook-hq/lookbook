module LookbookDocs
  class Screenshot::Component < Base
    attr_reader :alt, :browser, :caption, :href

    def initialize(src:, caption: nil, alt: nil, browser: true, **attrs)
      @src = src
      @caption = caption
      @alt = alt || caption
      @browser = browser
      @href = attrs.fetch(:href, nil)
      @attrs = attrs
    end

    def src
      "/images/screenshots/#{@src}"
    end
  end
end
