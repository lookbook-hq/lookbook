module Lookbook
  class Options
    delegate_missing_to :@options

    def initialize(**options)
      @options = convert_to_options(options)
    end

    protected def convert_to_options(value)
      case value
      when Hash
        ActiveSupport::InheritableOptions.new(
          value.to_h.symbolize_keys.transform_values { convert_to_options(_1) }
        )
      when Array
        value.map { convert_to_options(_1) }
      else
        value
      end
    end
  end
end
