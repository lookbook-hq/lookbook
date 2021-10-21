class CustomLayoutComponentPreview < ViewComponent::Preview
  layout "component_preview"

  def default
    render BasicComponent.new
  end

  # @!group Test

  def test_one
    render BasicComponent.new("Test one")
  end

  def test_two
    render BasicComponent.new("Test two")
  end

  # @!endgroup
end
