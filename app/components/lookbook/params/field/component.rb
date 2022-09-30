module Lookbook
  module Params
    class Field::Component < Lookbook::BaseComponent
      def initialize(name:, input:, label: nil, hint: nil, description: nil, value: nil, value_default: nil, value_type: nil, input_options: {}, index:, config: nil, **html_attrs)
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
        super(**html_attrs)
      end

      def hint?
        @hint.present?
      end

      def description?
        @description.present?
      end

      def input
        target = @config[:partial]

        if target
          tag.div "x-data": "paramsInputComponent({name: '#{@name}', value: #{escaped_value}})" do
            render(target, **render_props)
          end
        else
          input_error "No param input defined for input type '#{@input_name}'."
        end
      rescue ::ActionView::MissingTemplate => exception
        input_error "Param input partial '#{@config[:partial]}' could not be found."
      rescue => exception
        input_error exception.message
      end

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
        config_options = @config.fetch(:input_options, {})
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

      protected

      def alpine_component
        "paramsFieldComponent"
      end
    end
  end
end

   

  