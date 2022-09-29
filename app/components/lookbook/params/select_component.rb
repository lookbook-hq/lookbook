module Lookbook
  module Params
    class SelectComponent < Lookbook::ParamInputComponent
      def call
        select_tag(name,
          options_for_select(choices || [], value),
          **input_options,
          class: "form-input",
          "x-model": "value"
        )
      end
    end
  end
end