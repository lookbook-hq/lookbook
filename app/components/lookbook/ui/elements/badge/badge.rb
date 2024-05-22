module Lookbook
  module UI
    class Badge < BaseComponent
      attr_reader :color

      def initialize(label: nil, color: :slate, indicator: false, **kwargs)
        @label = label
        @color = color
        @indicator = indicator
      end

      def label
        @label || content
      end

      def style
        @indicator ? "indicator" : "full"
      end
    end
  end
end
