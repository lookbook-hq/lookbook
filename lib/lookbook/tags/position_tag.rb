module Lookbook
  class PositionTag < YardTag
    DEFAULT_POSITION = 100000

    def value
      if text.present?
        int = text.to_i
        int == 0 ? DEFAULT_POSITION : int
      else
        DEFAULT_POSITION
      end
    end

    alias_method :to_i, :value
  end
end
