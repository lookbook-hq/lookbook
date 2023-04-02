module LookbookDocs
  class Screenshot::Component < Base
    attr_reader :alt, :browser, :mobile, :caption, :href

    def initialize(src:, caption: nil, alt: nil, browser: true, mobile: false, **attrs)
      @src = src
      @caption = caption
      @alt = alt || caption
      @browser = browser
      @mobile = mobile
      @browser = false if mobile
      @href = attrs.fetch(:href, nil)
      @attrs = attrs
    end

    def src
      "/images/screenshots/#{@src}"
    end
  end
end
