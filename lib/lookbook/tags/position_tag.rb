module Lookbook
  class PositionTag < YardTag
    DEFAULT_POSITION = 100000

    def value
      text.present? ? text.to_i : DEFAULT_POSITION
    end

    alias_method :to_i, :value
  end
end
