module Lookbook
  class PanelComponent < Component
    attr_reader :panel, :padded, :overflow

    def initialize(padded: nil, overflow: :auto, **kwargs)
      @padded = padded
      @overflow = overflow

      super(**kwargs)
    end
  end
end
