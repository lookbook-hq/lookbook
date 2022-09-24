module Lookbook
  module Params
    class Field::Component < Lookbook::BaseComponent
      KNOWN_OPTIONS = %i[label hint value_type input choices].freeze

      attr_reader :name, :input

      def initialize(input:, name:, default: nil, value: nil, type: nil, value_type: nil, options: nil, **html_attrs)
        @input = input.to_s
        @name = name
        @value = value
        @default_value = default
        @type = type
        @value_type = value_type
        @options = options || {}
        super(**html_attrs)
      end

      def label
        options[:label] || name.titleize
      end

      def value
        val = @value.presence || @default_value
        @value_type == "Boolean" ? val == "true" || val == true : val
      end

      def type
        "text" if input == "text" && @type.nil?
      end

      def hint
        config_options[:hint]
      end

      def config_options
        @config_options ||= options.slice!(KNOWN_OPTIONS)
      end

      def field_options
        @field_options ||= options.except!(KNOWN_OPTIONS)
      end

      def options
        return @all_options if @all_options.present?
        opts = if @options.is_a?(Array) && input == "select"
          { choices: @options }
        else
          @options
        end
        @all_options = opts.with_indifferent_access
      end

      protected

      def alpine_data
        escaped_value = json_escape(value.to_json)
        "{name: '#{name}', value: #{escaped_value}}"
      end

      def alpine_component
        "paramsFieldComponent"
      end
    end
  end
end