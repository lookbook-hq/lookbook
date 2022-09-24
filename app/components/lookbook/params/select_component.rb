module Lookbook
  module Params
    class SelectComponent < Lookbook::ParamInputComponent
      def choices
        @options[:choices] || []
      end

      def html_options
        @options.except(:choices).merge({
          "x-model": "value"
        })
      end

      def call
        select_tag(name, options_for_select(choices, value), **html_options, class: "form-input")
      end
    end
  end
end