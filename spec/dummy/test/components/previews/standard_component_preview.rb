class StandardComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end
end