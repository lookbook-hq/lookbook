module LookbookDocs
  class Ribbon::Component < Base
    attr_reader :icon_name

    def initialize(icon: nil, **attrs)
      @icon_name = icon
      @attrs = attrs
    end
  end
end
