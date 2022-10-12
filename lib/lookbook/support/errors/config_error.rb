module Lookbook
  class ConfigError < LookbookError
    def initialize(msg = nil, scope: "config", **kwargs)
      super(msg, scope: scope, **kwargs)
    end
  end
end
