# @id annotated_test
# @label Annotated Label
# @unregistered this tag is not recognised
# @customtag a custom tag
# @customtag another instance of it
# @logical_path foo/bar
# @renders StandardComponent
# @renders InlineComponent
# @renders MadeUpComponent
class AnnotatedComponentPreview < ViewComponent::Preview
  # @id annotated-default
  # @label Annotated Example
  # @hidden
  # @unregistered this tag is not recognised
  # @customtag a custom tag
  # @customtag another instance of it
  def default
    render StandardComponent.new do
      "standard component content"
    end
  end

  # @label Param scenario
  # @param text
  def another_scenario(text: "another component content")
    render StandardComponent.new do
      text
    end
  end

  # This is a note about the third scenario
  def third_scenario
    render StandardComponent.new do
      "third component content"
    end
  end
end
