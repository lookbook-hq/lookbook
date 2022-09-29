module Lookbook
  module Params
    class ToggleComponent < Lookbook::ParamInputComponent
      def button_classes
        [
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors
            ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-input-border-focus",
          value == true ? "bg-lookbook-input-toggle-active" : "bg-lookbook-input-toggle"
        ]
      end

      def input_options
        super.merge({
          "@click.stop": "value = !value",
          role: "switch",
          type: "button",
          class: helpers.class_names(button_classes)
        })
      end

      def call
        button_tag **input_options do
          tag.span "aria-hidden": true, class: helpers.class_names([
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200",
            value == true ? "translate-x-5" : "translate-x-0"
          ])  
        end
      end
    end
  end
end