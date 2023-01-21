module LookbookDocs
  class DataList::Component < Base
    attr_reader :title

    def initialize(title: nil, data: {}, **attrs)
      @title = title
      @data = data
      @attrs = attrs
    end

    def render?
      @data.any?
    end

    def data
      grouped? ? @data : [@data]
    end

    def grouped?
      @data.is_a?(Array)
    end
  end
end
