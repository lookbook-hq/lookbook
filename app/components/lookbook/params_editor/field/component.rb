module Lookbook
  class ParamsEditor::Field::Component < Lookbook::BaseComponent
    def initialize(input:, name:, default: nil, value: nil, input_type: nil, type: nil, options: nil, **html_attrs)
      @input = input
      @name = name
      @value = value
      @default_value = default
      @input_type = input_type
      @type = type
      @options = options
      super(**html_attrs)
    end

    def label
      @name.titleize
    end

    def value
      val = @value.presence || @default_value
      @type == "Boolean" ? val == "true" || val == true : val
    end

    def field_type
      @input.to_s
    end

    def input_type
      @input_type.nil? && field_type == "text" ? "text" : @input_type
    end

    protected

    def alpine_data
      escaped_value = helpers.raw json_escape(value.to_json)
      "{name: '#{@name}', value: #{escaped_value}}"
    end

    def alpine_component
      "paramsEditorFieldComponent"
    end
  end
end
