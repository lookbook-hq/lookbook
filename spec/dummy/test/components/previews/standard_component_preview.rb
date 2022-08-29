class StandardComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end

  def second_example
    render StandardComponent.new do
      "standard component content 2"
    end
  end

  def third_example
    render StandardComponent.new do
      "standard component content 3"
    end
  end

  protected 

  def not_an_example
  end
end