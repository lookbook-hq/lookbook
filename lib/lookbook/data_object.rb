module Lookbook
  class DataObject
    class << self
      def new(*args, **properties)
        merged_args = args.map(&:to_h).reduce({}) { _1.merge(_2) }
        data = {**merged_args, **properties}.deep_symbolize_keys
        ActiveSupport::OrderedOptions.new.merge!(data.transform_values { convert_value(_1) })
      end

      def convert_value(value)
        if value.is_a?(Hash)
          DataObject.new(value)
        elsif value.is_a?(Array)
          value.map { DataObject.convert_value(_1) }
        else
          value
        end
      end
    end
  end
end
