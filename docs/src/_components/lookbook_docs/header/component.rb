module LookbookDocs
  class Header::Component < Base
    attr_reader :links

    def initialize(links: [], **attrs)
      @links = links
      @attrs = attrs
    end
  end
end
