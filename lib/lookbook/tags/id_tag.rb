module Lookbook
  class IdTag < BaseTag
    def value
      AttributeUtils.entity_id(@text)
    end
  end
end
