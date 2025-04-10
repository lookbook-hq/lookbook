class StandardComponentPreview < ViewComponent::Preview
  layout "application"

  def default
    render StandardComponent.new title: "default" do
      "standard component content"
    end
  end

  def second_scenario
    render StandardComponent.new do
      "standard component content 2"
    end
  end

  def mutli_line_def_scenario(foo: "bar",
    this: "that")
    render StandardComponent.new title: "multi-line" do
      "standard component content 3"
    end
  end

  # @param title [String]
  def scenario_with_params(title: nil)
    render StandardComponent.new(title: title) do
      "standard component with title param example"
    end
  end

  # @display theme dark
  def theme_override_scenario
    render StandardComponent.new do
      "dark theme only"
    end
  end

  protected

  def not_an_scenario
  end
end
