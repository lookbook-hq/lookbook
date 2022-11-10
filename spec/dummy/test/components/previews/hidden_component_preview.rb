# @hidden true
class HiddenComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "hidden component content"
    end
  end
end
