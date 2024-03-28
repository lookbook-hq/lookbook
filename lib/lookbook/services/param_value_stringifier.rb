require "active_model"

module Lookbook
  class ParamValueStringifier < Service
    def initialize(value)
      @value = value
    end

    def call
      if @value == true
        "true"
      elsif @value == false
        "false"
      elsif @value.is_a?(DateTime)
        @value.strftime("%Y-%m-%dT%H:%M")
      elsif @value.is_a?(Date)
        @value.strftime("%Y-%m-%d")
      elsif @value.is_a?(Hash) || @value.is_a?(Array)
        @value.to_yaml
      else
        @value.to_s
      end
    end
  end
end
