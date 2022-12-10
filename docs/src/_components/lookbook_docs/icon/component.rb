module LookbookDocs
  class Icon::Component < Base
    attr_reader :name

    def initialize(name:, size: 4, **attrs)
      @name = name.to_s.parameterize.tr("_", "-")
      @size = size || 4
      super(**attrs)
    end

    def size_rems
      "#{@size * 0.25}rem"
    end
  end
end
