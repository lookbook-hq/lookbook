module Lookbook
  class ParamInputComponent < ViewComponent::Base
    attr_reader :input, :name, :value, :value_type, :value_default, :input_bindings

    def initialize(input:, name:, value:, value_type:, value_default:, **options)
      @input = input
      @name = name
      @value = value
      @value_type = value_type
      @value_default = value_default
      @options = options
      @options[:id] = "param-#{name}"
      @input_bindings = true
    end

    def html_options
      @options
    end

    def escaped_value
      json_escape(@value.to_json)
    end

    def before_render
      @options["x-data"] = "paramsInputComponent({name: '#{name}', value: #{escaped_value}})"
      @options["x-bind"] = "bindings.input" if input_bindings 
    end
  end
end