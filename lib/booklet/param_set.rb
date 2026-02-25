# frozen_string_literal: true

module Booklet
  class ParamSet < Booklet::Object
    include Enumerable

    prop :params, _Array(Param), :positional, reader: :protected, default: -> { [] }

    def to_values_hash(values = {})
      values = values.to_h.symbolize_keys
      @params.map do |param|
        key = param.name
        value = if values.key?(key)
          param.cast_value(values[key])
        else
          param.default_value
        end

        [key, value]
      end.to_h
    end

    def with_values(values = {})
      values = values.to_h.symbolize_keys
      params_with_values = @params.map do |param|
        values.key?(param.name) ? param.with_value(values[:key]) : param.deep_dup
      end
      self.class.new(params_with_values)
    end

    def update(name, props)
      param = find!(name)
      props.to_h.except(:name).each { param.try("#{_1}=", _2) }
    end

    def push(*params)
      @params.push(*params.flatten)
    end

    def find!(name)
      param = find { _1.name == name }
      raise "Unknown param #{param}" unless param
      param
    end

    delegate :each, to: :@params
    delegate_missing_to :@params
  end
end
