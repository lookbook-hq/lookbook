module Lookbook
  class Param
    attr_reader :name, :options, :description

    def initialize(name:, input: nil, description: nil, value_type: nil, value_default: nil, value_default_resolver: nil, value: nil, options: {})
      @name = name
      @input = input
      @description = description
      @value_type = value_type
      @value_default = value_default
      @value_default_resolver = value_default_resolver
      @value = value
      @options = options
    end

    # Resolved on first access, so building a Param never evaluates the scenario
    # method's default expression unless something needs it: type inference when
    # the tag declares no type, or the UI falling back to it when no value was
    # given.
    def value_default
      if @value_default_resolver
        @value_default = @value_default_resolver.call
        @value_default_resolver = nil
      end
      @value_default
    end

    def label
      options.label || name.titleize
    end

    def hint
      options.hint
    end

    def input
      @input || guess_input
    end

    def value
      val = @value || value_default
      if value_type == "datetime"
        formatter = (input == "datetime-local") ? "%Y-%m-%dT%T" : "%Y-%m-%d"
        StringValueCaster.call(val, "datetime")&.strftime(formatter)
      else
        val
      end
    end

    def value_type
      @value_type || guess_value_type
    end

    def input_options
      return @_input_options if @_input_options

      runtime_options = options.except([*methods, :name, :value_default, :description])
      @_input_options ||= Store.new(input_config.options.merge(runtime_options))
    end

    def input_partial
      input_config.partial
    end

    def cast_value
      raise ArgumentError.new("Cannot cast param '#{name}' without a value set") if value.nil?

      StringValueCaster.call(value, value_type)
    end

    # @param value_default_resolver [#call] overrides how the scenario default is
    #   resolved, so several Params built from one tag can share one evaluation
    def self.from_tag(tag, value: nil, value_default_resolver: -> { tag.value_default })
      new(
        name: tag.name,
        input: tag.input || tag.options.input,
        description: tag.description || tag.options.description,
        value_type: tag.value_type || tag.options.value_type,
        value_default_resolver: value_default_resolver,
        options: tag.options,
        value: value
      )
    end

    protected

    def input_config
      config = Lookbook::Engine.inputs.get_input(input)
      config || raise(Lookbook::Error.new("Unknown input type '#{input}'"))
    end

    def guess_input
      if @value_type == "boolean" || (@value_type.blank? && boolean?(value_default))
        "toggle"
      else
        "text"
      end
    end

    def guess_value_type
      if input == "toggle"
        "boolean"
      elsif input == "number"
        "integer"
      elsif boolean?(value_default)
        "boolean"
      elsif value_default.is_a?(Symbol)
        "symbol"
      elsif ["date", "datetime-local"].include?(input) || value_default.is_a?(DateTime)
        "datetime"
      else
        "string"
      end
    end

    def boolean?(value)
      value == true || value == false
    end
  end
end
