class ParamsEditorComponentPreview < ViewComponent::Preview
  def field_examples
    render Lookbook::ParamsEditor::Component.new do |editor|
      editor.with_field input: "text", name: "text-field"
      editor.with_field input: "textarea", name: "textarea"
      editor.with_field input: "select", name: "select input", options: ["option 1", "option 2"]
    end
  end
end
