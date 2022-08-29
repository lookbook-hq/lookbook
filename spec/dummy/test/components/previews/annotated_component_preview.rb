# @id annotated_test
# @label Annotated Label
# @hidden true
# @unregistered this tag is not recognised
# @custom a custom tag
# @custom another instance of it
class AnnotatedComponentPreview < ViewComponent::Preview
  
  # @id annotated-default
  # @label Annotated Example
  # @hidden
  # @unregistered this tag is not recognised
  # @custom a custom tag
  # @custom another instance of it
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end
end