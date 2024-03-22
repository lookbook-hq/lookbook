module Lookbook
  class PriorityTag < YardTag
    TAG_NAME = "priority"

    def value
      if @text.present?
        text.to_i
      end
    end
  end
end
