# @id annotated_test
# @label Annotated Label
# @hidden true
# @unregistered this tag is not recognised
# @custom a custom tag
# @custom another instance of it
class AnnotatedComponentPreview < ViewComponent::Preview
  # @hidden
  def hidden_example
    render StandardComponent.new do
      "standard component content"
    end
  end
end