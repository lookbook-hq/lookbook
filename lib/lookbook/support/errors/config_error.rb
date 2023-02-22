module Lookbook
  class ConfigError < Error
    def initialize(msg = nil, scope: "config", **kwargs)
      super(msg, scope: scope, **kwargs)
    end
  end
end
