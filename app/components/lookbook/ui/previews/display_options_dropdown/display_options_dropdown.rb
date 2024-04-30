module Lookbook
  module UI
    class DisplayOptionsDropdown < BaseComponent
      def initialize(options:, values:, **kwargs)
        @options = options
        @values = values
      end

      def options
        @options.map { _2.merge({value: @values[_1]}) }
      end
    end
  end
end
