module Lookbook
  module Params
    class Editor::Component < Lookbook::BaseComponent
      renders_many :fields, ->(name:, input:, input_options:, value:, value_type:, value_default:, **attrs) do
        input_config = @inputs[input.to_sym]

        if input_config.present?
          target = input_config[:render_target]
          props = input_config[:default_options].merge(input_options).symbolize_keys

          value = value.presence || value_default
          value = value_type.downcase == "boolean" ? value == "true" || value == true : value

          props.merge!({
            name: name,
            input: input,
            value: value,
            value_type: value_type,
            value_default: value_default
          })
        end

        render Lookbook::Params::Field::Component.new(name: name, input: input, value: value, **attrs) do |field|
          begin
            if target
              rendered_input = target.is_a?(String) ? render(target, **props) : render(target.new(**props))
              field.with_input { rendered_input }
            else
              field.with_error { "No param input defined for input type '#{input}'." }
            end
          rescue ::ActionView::MissingTemplate => exception
            field.with_error { "Param input '#{input_config[:render_target]}' could not be found." }
          rescue => exception
            field.with_error { exception.message }
          end
        end
      end

      def initialize(inputs: {}, **html_attrs)
        @inputs = inputs
        super(**html_attrs)
      end

      protected

      def alpine_component
        "paramsEditorComponent"
      end
    end
  end
end