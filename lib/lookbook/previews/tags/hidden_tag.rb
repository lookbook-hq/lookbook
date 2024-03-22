module Lookbook
  class HiddenTag < YardTag
    TAG_NAME = "hidden"

    def value
      @text != "false"
    end
  end
end
