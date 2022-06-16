module Lookbook
  class ParamsEditor::Component < Lookbook::BaseComponent
    renders_many :fields, Lookbook::ParamsEditor::Field::Component

    protected

    def alpine_component
      "paramsEditorComponent"
    end
  end
end
