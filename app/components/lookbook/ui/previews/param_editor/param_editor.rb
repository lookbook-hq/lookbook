module Lookbook
  module UI
    class ParamEditor < BaseComponent
      attr_reader :param

      def initialize(param:, value:, **kwargs)
        @param = param
        @value = value
      end

      def value
        @value.nil? ? param.default_value_string : @value
      end

      def cast_value
        @value.nil? ? param.default_value : param.cast_value(@value)
      end

      def input
        Inspector.param_input(param.input_type)
      end

      def input_options
        {
          **input.options.to_h,
          **param.input_options.to_h
        }
      end
    end
  end
end
