class ParamFieldsetComponentPreview < ViewComponent::Preview
  
  def field_examples
    render Lookbook::ParamFieldset::Component.new do |fieldset|
      fieldset.field input: "text", name: "text-field"
      fieldset.field input: "textarea", name: "textarea"
      fieldset.field input: "select", name: "select input", options: ["option 1", "option 2"]
    end
  end

end
