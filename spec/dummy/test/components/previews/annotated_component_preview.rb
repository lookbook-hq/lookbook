class AnnotatedComponentPreview < ViewComponent::Preview
  # @hidden
  def hidden_example
    render StandardComponent.new do
      "standard component content"
    end
  end
end