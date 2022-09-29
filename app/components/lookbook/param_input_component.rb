module Lookbook
  class ParamInputComponent < ViewComponent::Base
    attr_reader :input, :name, :value, :value_type, :value_default, :choices, :input_options
    def initialize(input:, name:, value:, value_type:, value_default:, input_options:, choices: nil)
      @input = input
      @name = name
      @value = value
      @choices = choices
      @value_type = value_type
      @value_default = value_default
      @input_options = input_options
    end
  end
end