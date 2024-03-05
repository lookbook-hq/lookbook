module Lookbook
  module DisplayHelper
    def markdown(...)
      Markdown.render(...).html_safe
    end

    def code_comment(...)
      Languages.comment(...).html_safe
    end
  end
end
