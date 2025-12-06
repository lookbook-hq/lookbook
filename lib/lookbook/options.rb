module Lookbook
  class Options < ActiveSupport::OrderedOptions
    class << self
      def new(**options)
        super().merge!(options.transform_values { convert_value(_1) })
      end

      def convert_value(value, wrap = true)
        if !wrap && value.respond_to?(:to_h)
          value.to_h
        elsif wrap && value.respond_to?(:to_h)
          new(**value.to_h)
        elsif value.is_a?(Array)
          value.map { convert_value(_1, wrap) }
        else
          value
        end
      end
    end

    def to_hash
      transform_values { self.class.convert_value(_1, false) }
    end

    alias_method :to_h, :to_hash
  end
end
