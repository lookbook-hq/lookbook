module Lookbook::Rails
  module InertiaSerializable
    extend ActiveSupport::Concern

    def to_inertia(deep: true)
      _inertia_props.map do |prop|
        key, getter = Array.wrap(prop)
        getter ||= key

        result = public_send(getter.to_sym)

        value = if deep
          case result
          when InertiaSerializable
            result.to_inertia(deep:)
          when Array
            result.map { _1.respond_to?(:to_inertia) ? _1.to_inertia(deep:) : _1 }
          when Hash
            result.transform_values { _1.respond_to?(:to_inertia) ? _1.to_inertia(deep:) : _1 }
          else
            result
          end
        else
          result.try(:to_inertia) || result
        end

        [key, value]
      end.to_h
    end

    class_methods do
      def inertia_props(*props)
        self._inertia_props = props
      end
    end

    included do
      class_attribute :_inertia_props,
        instance_predicate: false,
        default: []
    end
  end
end
