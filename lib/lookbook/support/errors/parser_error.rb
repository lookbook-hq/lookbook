module Lookbook
  class ParserError < LookbookError
    def initialize(msg = nil, scope: "parser", **kwargs)
      super(msg, scope: scope, **kwargs)
    end
  end
end
