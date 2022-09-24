module Lookbook
  module Params
    class Field::Component < Lookbook::BaseComponent
      renders_one :input
      renders_one :error

      def initialize(name:, input:, label: nil, hint: nil, description: nil, value: nil, **html_attrs)
        @input = input
        @name = name
        @label = label || name.titleize
        @hint = hint
        @description = description
        @value = value
        super(**html_attrs)
      end

      protected

      def alpine_data
        escaped_value = json_escape(@value.to_json)
        "{name: '#{@name}', value: #{escaped_value}}"
      end

      def alpine_component
        "paramsFieldComponent"
      end
    end
  end
end