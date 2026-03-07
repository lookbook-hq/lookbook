# frozen_string_literal: true

require "active_model"

module Lookbook::Core
  class Param < Lookbook::Core::Object
    PARAM_OPTIONS = %i[default label description hint choices]

    prop :name, Symbol, :positional, reader: :public
    prop :label, _Nilable(String), writer: :public
    prop :description, _Nilable(String), writer: :public
    prop :control_type, _Nilable(Symbol), writer: :public
    prop :value_type, _Nilable(Symbol), writer: :public
    prop :default_value, _Nilable(_Any), reader: :public
    prop :value, _Nilable(_Any), writer: :protected
    prop :required, _Boolean, writer: :public, reader: :public, default: false
    prop :options, _Union(Hash, Proc), default: -> { {} }
    prop :explicit, _Boolean, default: false, writer: :public

    def label
      @label ||= options.label || name.to_s.titleize
    end

    def description
      @description ||= options.description || options.hint
    end

    def value_type
      @value_type || guess_value_type
    end

    def cast_value(str)
      Param.cast_string_value(str, value_type)
    end

    def with_value(value)
      deep_dup.tap do |param|
        param.value = param.cast_value(value)
      end
    end

    def value
      @value || @default_value
    end

    def control_type
      @control_type || guess_control_type
    end

    def input_choices
      # Normalize choice options to all be [key, value] pairs.
      options.fetch(:choices, []).map do |option|
        case option
        when Array
          [option.first, option.last]
        else
          [option, option]
        end
      end
    end

    def input_options
      @input_options ||= Options.new(options.except(PARAM_OPTIONS))
    end

    def options=(opts)
      @options = opts
      @resolved_options = nil
      @input_options = nil
    end

    def options
      @resolved_options ||= Options.new(@options.respond_to?(:call) ? @options.call : @options)
    end

    def required? = !!@required

    def explicit?
      @explicit
    end

    private def guess_control_type
      if @value_type == :boolean || (@value_type.nil? && Helpers.boolean?(value))
        :checkbox
      else
        :text
      end
    end

    private def guess_value_type
      if control_type.in?([:toggle, :checkbox])
        :boolean
      elsif control_type == :number
        :integer
      elsif Helpers.boolean?(value)
        :boolean
      elsif value.is_a?(Symbol)
        :symbol
      elsif control_type.in?([:date, :"datetime-local"]) || value.is_a?(DateTime)
        :datetime
      else
        :string
      end
    end

    class << self
      def cast_string_value(value, type)
        return value unless value.is_a?(String)

        type = type.to_s.downcase
        cast_method = :"cast_to_#{type}"
        raise ArgumentError, "Unable to cast to `#{type}`" unless respond_to?(cast_method, true)

        send(cast_method, value)
      end

      protected def cast_to_string(value) = value.to_s

      protected def cast_to_symbol(value)
        value.delete_prefix(":").to_sym if value.present?
      end

      protected def cast_to_datetime(value) = DateTime.parse(value)

      protected def cast_to_boolean(value) = active_model_cast(value, :boolean)

      protected def cast_to_integer(value) = active_model_cast(value, :integer)

      protected def cast_to_float(value) = active_model_cast(value, :integer)

      protected def cast_to_hash(value)
        result = YAML.safe_load(value)
        raise "'#{value}' is not a YAML Hash" unless result.is_a?(Hash)
        result
      end

      protected def cast_to_array(value)
        result = YAML.safe_load(value)
        raise "'#{value}' is not a YAML Array" unless result.is_a?(Array)
        result
      end

      private def active_model_cast(value, type)
        type_class = "ActiveModel::Type::#{type.to_s.camelize}".constantize
        type_class.new.cast(value)
      end
    end
  end
end
