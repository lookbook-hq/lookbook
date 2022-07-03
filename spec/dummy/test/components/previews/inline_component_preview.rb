class InlineComponentPreview < ViewComponent::Preview
  def default
    render InlineComponent.new do
      "inline component content"
    end
  end

  def another_example
    render InlineComponent.new do
      "Another inline component"
    end
  end
end