module Lookbook
  class PositionTag < BaseTag
    def value
      @text.present? ? @text.to_i : 100000
    end

    alias_method :to_i, :value
  end
end
