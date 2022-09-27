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
        @config = config
        super(**html_attrs)
      end

      def hint?
        @hint.present?
      end

      def description?
        @description.present?
      end

      def input
        begin
          if @target
            @target.is_a?(String) ? render(@target, **@input_props) : render(@target.new(**@input_props))
          else
            input_error "No param input defined for input type '#{@input_name}'."
          end
        rescue ::ActionView::MissingTemplate => exception
          input_error "Param input '#{config[:render_target]}' could not be found."
        rescue => exception
          input_error exception.message
        end
      end

      def input_error(error)
        tag.div error, class: "p-2 text-red-500 italic"
      end

      def before_render
        if @config.present?
          @target = @config[:render_target]
          @input_props = @config[:default_options].merge(@input_options).symbolize_keys

          value = @value.presence || @value_default
          value = @value_type.downcase == "boolean" ? value == "true" || value == true : value

          @input_props.merge!({
            name: @name,
            input: @input_name,
            value: value,
            value_type: @value_type,
            value_default: @value_default
          })
        end
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

   

  