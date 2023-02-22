module Lookbook
  class ParserError < Error
    def initialize(msg = nil, scope: "parser", **kwargs)
      super(msg, scope: scope, **kwargs)
    end
  end
end
