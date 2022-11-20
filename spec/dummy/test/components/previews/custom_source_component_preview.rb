class CustomSourceComponentPreview < ViewComponent::Preview
  # @source ./nested/my_component/component.js
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end
end
