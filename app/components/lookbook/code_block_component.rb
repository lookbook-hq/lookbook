module Lookbook
  class CodeBlockComponent < Component
    attr_reader :code, :opts

    def initialize(code = nil, opts = {}, **kwargs)
      @code = code.strip
      @opts = opts.transform_keys { _1.camelize(:lower) }

      super(**kwargs)
    end
  end
end
