module LookbookDocs
  class Header::Component < Base
    attr_reader :links, :github, :demo

    def initialize(links: [], github: nil, demo: nil, **attrs)
      @links = links
      @github = github
      @demo = demo
      @attrs = attrs
    end
  end
end
