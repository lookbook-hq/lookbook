class UnannotatedComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end

  def second
    render StandardComponent.new do
      "second standard component content"
    end
  end
end
