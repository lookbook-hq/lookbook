# @id alt-name-component-preview
class Nested::MyOtherComponent::ComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "component content"
    end
  end
end
