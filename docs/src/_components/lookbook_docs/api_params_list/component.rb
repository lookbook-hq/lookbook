module LookbookDocs
  class ApiParamsList::Component < Base
    attr_reader :params

    def initialize(params: [], **attrs)
      @params = params
      @attrs = attrs
    end
  end
end
