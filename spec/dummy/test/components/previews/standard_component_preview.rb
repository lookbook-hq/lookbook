class StandardComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new title: "default" do
      "standard component content"
    end
  end

  def second_example
    render StandardComponent.new do
      "standard component content 2"
    end
  end

  def mutli_line_def_example(foo: "bar",
    this: "that")
    render StandardComponent.new title: "multi-line" do
      "standard component content 3"
    end
  end

  # @param title [String]
  def example_with_params(title: nil)
    render StandardComponent.new(title: title) do
      "standard component with title param example"
    end
  end

  protected

  def not_an_example
  end
end
