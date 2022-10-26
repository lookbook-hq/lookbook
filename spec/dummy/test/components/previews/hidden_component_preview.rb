# @hidden true
class HiddenComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end
end
