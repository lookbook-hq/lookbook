module Lookbook
  module Params
    class Editor::Component < Lookbook::BaseComponent
      renders_many :fields, ->(input:, description: nil, **attrs) do
        @field_count += 1
        @descriptions = true if description.present?
        input_config = @inputs[input.tr("-", "_").to_sym]
        Lookbook::Params::Field::Component.new(input: input, description: description, index: @field_count, config: input_config, **attrs)
      end

      def initialize(inputs: {}, **html_attrs)
        @inputs = inputs
        @field_count = -1
        @descriptions = false
        @@input_styles = {}
        super(**html_attrs)
      end

      def before_render
        fields
      end

      def param_styles
        @css_styles ||= @@input_styles.map do |input_name, styles|
          styles.map { |s| "[data-param-input=#{input_name}] #{s}" }.join("\n")
        end.join("\n")
      end

      def self.add_styles(input, styles)
        @@input_styles[input] ||= styles
      end

      protected

      def alpine_component
        "paramsEditorComponent"
      end
    end
  end
end
