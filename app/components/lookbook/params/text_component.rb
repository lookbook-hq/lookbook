module Lookbook
  module Params
    class TextComponent < Lookbook::ParamInputComponent      
      def call
        text_field_tag(name, value,
          **input_options,
          type: input,
          class: "form-input",
          "x-model.debounce.200": "value"
        )
      end
    end
  end
end