module LookbookDocs
  class OptionsList::Component < Base
    renders_many :options, ->(**kwargs) do
      @options.push(kwargs)
    end

    attr_reader :options, :prefix

    def initialize(options: nil, prefix: nil, **attrs)
      @options = Array(options)
      @prefix = prefix
      @attrs = attrs
    end
  end
end
