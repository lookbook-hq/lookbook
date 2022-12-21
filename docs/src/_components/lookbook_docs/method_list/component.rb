module LookbookDocs
  class MethodList::Component < Base
    renders_many :items, types: {
      method: Method::Component,
      api_method: ApiMethod::Component
    }

    attr_reader :title

    def initialize(title: nil, **attrs)
      @title = title
      @attrs = attrs
    end
  end
end
