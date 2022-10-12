module Lookbook
  class ConfigError < LookbookError
    def initialize(msg = nil, scope = "config")
      super(msg, scope)
    end
  end
end
