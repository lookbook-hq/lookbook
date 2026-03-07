module Lookbook
  module ApplicationHelper
    def snippet(code, lang:)
      Lookbook.highlight(code, lang:)
    end
  end
end
