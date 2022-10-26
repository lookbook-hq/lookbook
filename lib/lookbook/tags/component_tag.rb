module Lookbook
  class ComponentTag < YardTag
    def value
      text.constantize if text.present?
    end
  end
end
