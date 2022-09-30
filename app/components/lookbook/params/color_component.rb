module Lookbook
  module Params
    class ColorComponent < Lookbook::ParamInputComponent
      def call
        text_field_tag(name, value,
          **input_options,
          type: "color",
          "x-model.throttle.300": "value"
        )
      end
    end
  end
end