module Lookbook
  class ComponentTag < BaseTag
    def value
      @text.constantize
    end

    alias_method :klass, :value
  end
end
