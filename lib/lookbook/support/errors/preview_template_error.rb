module Lookbook
  class PreviewTemplateError < LookbookError
    def initialize(msg = nil, scope: "preview", **kwargs)
      super(msg, scope: scope, **kwargs)
    end
  end
end
