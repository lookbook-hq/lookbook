class NestedComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new title: "I work!"
  end
end
