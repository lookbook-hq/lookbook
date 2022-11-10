module Lookbook
  class ComponentTag < YardTag
    def value
      text.constantize if text.present?
    rescue
      nil
    end

    def tag_body
      text
    end
  end
end
