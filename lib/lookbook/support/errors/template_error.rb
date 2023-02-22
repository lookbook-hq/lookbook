module Lookbook
  class TemplateError < Error
    def initialize(msg = nil, scope: "template", **kwargs)
      super(msg, scope: scope, **kwargs)
    end
  end
end
