module Lookbook
  module ApplicationHelper
    def snippet(code, lang:)
      Booklet.highlight(code, lang:)
    end
  end
end
