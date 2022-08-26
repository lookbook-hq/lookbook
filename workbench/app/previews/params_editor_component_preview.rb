class ParamsEditorComponentPreview < ViewComponent::Preview
  def field_examples
    render Lookbook::ParamsEditor::Component.new do |editor|
      editor.field input: "text", name: "text-field"
      editor.field input: "textarea", name: "textarea"
      editor.field input: "select", name: "select input", options: ["option 1", "option 2"]
    end
  end
end
