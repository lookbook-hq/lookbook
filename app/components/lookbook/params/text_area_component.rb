module Lookbook
  module Params
    class TextAreaComponent < Lookbook::ParamInputComponent      
      def call
        text_area_tag(name, value,
          rows: 4,
          **input_options,
          class: "form-input",
          "x-model.debounce.200": "value",
          "@keydown.stop": true
        )
      end
    end
  end
end