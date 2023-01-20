module LookbookDocs
  class DataList::Component < Base
    def initialize(data: {}, **attrs)
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
