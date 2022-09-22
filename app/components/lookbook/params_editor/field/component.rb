module Lookbook
  class ParamsEditor::Field::Component < Lookbook::BaseComponent
    KNOWN_OPTIONS = %i[label hint type input choices].freeze

    attr_reader :name

    def initialize(input:, name:, default: nil, value: nil, input_type: nil, type: nil, options: nil, **html_attrs)
      @input = input
      @name = name
      @value = value
      @default_value = default
      @input_type = input_type
      @type = type
      @options = options || {}
      super(**html_attrs)
    end

    def label
      options[:label] || name.titleize
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
      opts = if @options.is_a?(Array) && field_type == "select"
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
      "paramsEditorFieldComponent"
    end
  end
end
