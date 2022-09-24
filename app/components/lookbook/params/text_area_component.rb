module Lookbook
  module Params
    class TextAreaComponent < Lookbook::ParamInputComponent      
      def call
        text_area_tag(name, value, rows: 4, **html_options, class: "form-input")
      end
    end
  end
end