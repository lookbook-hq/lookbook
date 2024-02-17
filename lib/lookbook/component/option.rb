module Lookbook
  module Component
    class Option
      include OptionItem

      attr_accessor :default
      attr_reader :from, :name

      def initialize(name, required: false, value: :undefined, from: nil, **kwargs)
        @name = name.to_sym
        @required = required
        @value = value
        @from = Array(from)
        @private = kwargs.fetch(:private, false)
        @default = kwargs.fetch(:default, nil)
        @alias = kwargs.fetch(:alias, nil)
      end

      def validate_required!
        if required? && undefined?
          raise ArgumentError, "The `#{name}` option requires a value"
        end
      end

      def required?
        @required == true
      end

      def undefined?
        @value == :undefined
      end

      def value
        undefined? ? default : @value
      end

      def value=(val)
        if from.any? && !from.include?(val)
          raise ArgumentError, "`#{val}` is not a valid #{name} value.\n\tAvailable options: #{from}"
        end
        @value = val
      end
    end
  end
end
