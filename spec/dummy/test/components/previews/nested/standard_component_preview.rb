class Nested::StandardComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "group standard component content"
    end
  end
end
