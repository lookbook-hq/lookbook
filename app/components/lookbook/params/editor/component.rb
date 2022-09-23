module Lookbook
  module Params
    class Editor::Component < Lookbook::BaseComponent
      renders_many :fields, Lookbook::Params::Field::Component

      protected

      def alpine_component
        "paramsEditorComponent"
      end
    end
  end
end