module Lookbook
  module ApplicationHelper
    def snippet(code, lang:)
      Lookbook::Core.highlight(code, lang:)
    end
  end
end
