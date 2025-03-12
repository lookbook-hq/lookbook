module Lookbook
  class DataObject
    class << self
      def new(*hashables, **props)
        data = deep_merge(*hashables, props).deep_symbolize_keys
        data_object = convert_data(data)
        ActiveSupport::OrderedOptions.new.merge!(data_object)
      end

      def array(arr)
        arr.map { new(_1) }
      end

      private

      def convert_data(data)
        data.transform_values { convert_value(_1) }
      end

      def convert_value(value)
        if value.is_a?(Hash)
          new(value)
        elsif value.is_a?(Array)
          value.map { convert_value(_1) }
        else
          value
        end
      end

      def deep_merge(*hashables)
        hashables.map(&:to_h).reduce({}) { _1.deep_merge(_2) }
      end
    end
  end
end
