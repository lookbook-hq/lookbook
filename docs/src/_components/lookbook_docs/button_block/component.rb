module LookbookDocs
  class ButtonBlock::Component < Base
    attr_reader :url, :center

    renders_one :button, ->(text = nil, href: nil, **opts) do
      opts[:text] = text if text
      @url ||= href
      Button::Component.new(**opts, href: href)
    end

    def initialize(url: nil, center: false, **attrs)
      @url = url
      @center = center
      @attrs = attrs
    end
  end
end
