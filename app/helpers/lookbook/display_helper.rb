module Lookbook
  module DisplayHelper
    def markdown(...)
      Lookbook::Markdown.render(...).html_safe
    end
  end
end
