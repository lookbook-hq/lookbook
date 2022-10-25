module Lookbook
  class ComponentTag < YardTag
    def value
      text.constantize
    end
  end
end
