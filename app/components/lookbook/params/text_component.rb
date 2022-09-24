module Lookbook
  module Params
    class TextComponent < Lookbook::ParamInputComponent      
      def call
        text_field_tag(name, value, **html_options, class: "form-input", type: input)
      end
    end
  end
end