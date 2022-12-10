module LookbookDocs
  class Heading::Component < Base
    attr_reader :level, :splitter

    def initialize(id: nil, level: 2, hidden: false, splitter: true, **attrs)
      @id = id
      @level = level
      @hidden = hidden
      @splitter = splitter
      @attrs = attrs
    end

    def id
      @id.present? ? dom_id(@id) : nil
    end

    def tag_name
      :"h#{level}"
    end

    def hidden?
      !!@hidden
    end
  end
end
