module LookbookDocs
  class ParamsList::Component < Base
    renders_many :params, ->(**kwargs) do
      @params.push(kwargs)
    end

    attr_reader :options_only

    def initialize(params: nil, options_only: false, **attrs)
      @params = Array(params)
      @options_only = options_only
      @attrs = attrs
    end

    attr_reader :params
  end
end
