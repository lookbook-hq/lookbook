module LookbookDocs
  class Heading::Component < Base
    attr_reader :level, :step

    def initialize(id: nil, level: 2, hidden: false, step: nil, **attrs)
      @id = id
      @level = level
      @hidden = hidden
      @step = step
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
