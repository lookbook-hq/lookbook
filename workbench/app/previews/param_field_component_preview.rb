class ParamFieldComponentPreview < ViewComponent::Preview
  
  def text_field
    render Lookbook::ParamField::Component.new(
      input: "text",
      name: "text-field"
    )
  end

  def textarea
    render Lookbook::ParamField::Component.new(
      input: "textarea",
      name: "textarea",
      value: "Some content in the textarea"
    )
  end

  def select
    render Lookbook::ParamField::Component.new(
      input: "select",
      name: "select-input",
      options: ["option 1", "option 2", "option 3"]
    )
  end

  # @!group Toggle 

  def toggle_on
    render Lookbook::ParamField::Component.new(
      input: "toggle",
      name: "This is on",
      value: true
    )
  end

  def toggle_off
    render Lookbook::ParamField::Component.new(
      input: "toggle",
      name: "This is off",
      value: false
    )
  end

  # @!endgroup 

end
