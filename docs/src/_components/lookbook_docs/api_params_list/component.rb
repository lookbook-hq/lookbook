module LookbookDocs
  class ApiParamsList::Component < Base
    renders_many :params, ->(**kwargs) do
      @params.push(kwargs)
    end

    renders_many :options, ->(**kwargs) do
      @options.push(kwargs)
    end

    attr_reader :options_only

    def initialize(params: nil, options: nil, options_only: false, **attrs)
      @params = Array(params)
      @options = Array(options)
      @options_only = options_only
      @attrs = attrs
    end

    def params
      @params.map do |param|
        param[:opts] = options_for_param(param[:name])
        param
      end
    end

    def options_for_param(param_name)
      @options.filter { |opt| opt[:pair].to_s == param_name.to_s }
    end
  end
end
