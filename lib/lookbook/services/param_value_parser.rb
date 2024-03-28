require "active_model"

module Lookbook
  class ParamValueParser < Service
    def initialize(value, type = "string")
      @value = value.to_s
      @type = type.to_s.downcase
      @cast_method = :"cast_to_#{@type}"

      unless respond_to?(@cast_method)
        raise ArgumentError, "'#{@type}' is not a valid value type to cast to."
      end
    end

    def call
      return @nil if @value.empty?
      public_send(@cast_method)
    end

    def cast_to_string
      @value
    end

    def cast_to_symbol
      @value.delete_prefix(":").to_sym if @value.present?
    end

    def cast_to_hash
      result = YAML.safe_load(@value)
      unless result.is_a?(Hash)
        raise "'#{@value}' is not a YAML Hash"
      end
      result
    end

    def cast_to_array
      result = YAML.safe_load(@value)
      unless result.is_a?(Array)
        raise "'#{@value}' is not a YAML Array"
      end
      result
    end

    def cast_to_datetime
      DateTime.parse(@value)
    end

    def active_model_cast
      type_class = "ActiveModel::Type::#{@type.camelize}".constantize
      type_class.new.cast(@value)
    end

    alias_method :cast_to_boolean, :active_model_cast
    alias_method :cast_to_integer, :active_model_cast
    alias_method :cast_to_float, :active_model_cast
  end
end
