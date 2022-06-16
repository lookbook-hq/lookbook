class InlineComponentPreview < ViewComponent::Preview
  def default
    render InlineComponent.new do
      "inline component content"
    end
  end
end