module LookbookDocs
  class MethodList::Component < Base
    renders_many :items, types: {
      method: Method::Component,
      api_method: ApiMethod::Component
    }

    attr_reader :title

    def initialize(id: nil, title: nil, **attrs)
      @id = id
      @title = title
      @attrs = attrs
    end

    def id
      (@id || title)&.force_encoding("utf-8")&.parameterize
    end
  end
end
