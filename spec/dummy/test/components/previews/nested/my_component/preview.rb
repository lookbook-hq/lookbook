# @id alt-name-preview
class Nested::MyComponent::Preview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "component content"
    end
  end
end
