module Lookbook
  module Params
    class Field::Component < Lookbook::BaseComponent
      def initialize(name:, input:, index:, label: nil, hint: nil, description: nil, value: nil, value_default: nil, value_type: nil, input_options: {}, config: nil, **html_attrs)
        @input_name = input
        @name = name
        @label = label || name.titleize
        @hint = hint
        @description = description
        @value = value
        @index = index
        @input_options = input_options
        @value_default = value_default
        @value_type = value_type
        @config = config || {}
        @rendered_input = nil
        super(**html_attrs)
      end

      def hint?
        @hint.present?
      end

      def description?
        @description.present?
      end

      def input
        @rendered_input
      end

      def before_render
        tpl = TemplateParser.new(render_input)
        Editor::Component.add_styles(@input_name, tpl.styles)

        wrapper_attrs = {
          data: {"param-input": @input_name},
          "x-data": "paramsInputComponent({name: '#{@name}', value: #{escaped_value}})"
        }

        @rendered_input = tag.div(**wrapper_attrs) do
          tpl.content
        end
      end

      protected

      def input_error(error)
        tag.div error, class: "p-2 text-red-500 italic"
      end

      def value
        val = @value.presence || @value_default
        @value_type.downcase == "boolean" ? val == "true" || val == true : val
      end

      def escaped_value
        json_escape(value.to_json)
      end

      def input_options
        config_options = @config.fetch(:opts, {})
        opts = config_options.merge(@input_options).symbolize_keys
        opts[:id] = "param-#{@name}"
        opts
      end

      def render_props
        {
          name: @name,
          input: @input_name,
          value: value,
          value_type: @value_type,
          value_default: @value_default,
          input_options: input_options.except(:choices),
          choices: input_options[:choices]
        }
      end

      def render_input
        target = @config[:partial]
        if target
          render(target, **render_props)
        else
          input_error "No param input defined for input type '#{@input_name}'."
        end
      rescue ::ActionView::MissingTemplate => exception
        Lookbook.logger.error exception
        input_error "Param input partial '#{@config[:partial]}' could not be found."
      end

      def alpine_component
        "paramsFieldComponent"
      end
    end
  end
end
