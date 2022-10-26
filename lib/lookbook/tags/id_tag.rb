module Lookbook
  class IdTag < YardTag
    def value
      AttributeUtils.entity_id(text) if text.present?
    end
  end
end
