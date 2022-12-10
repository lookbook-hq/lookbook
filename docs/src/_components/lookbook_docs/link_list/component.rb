module LookbookDocs
  class LinkList::Component < Base
    attr_reader :links

    def initialize(links: nil, **attrs)
      @links = links.to_a
      @attrs = attrs
    end
  end
end
