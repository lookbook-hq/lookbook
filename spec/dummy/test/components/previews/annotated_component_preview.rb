# @id annotated_test
# @label Annotated Label
# @unregistered this tag is not recognised
# @customtag a custom tag
# @customtag another instance of it
# @logical_path foo/bar
# @component StandardComponent
# @component InlineComponent
# @component MadeUpComponent
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

  # @label Param example
  # @param text
  def another_example(text: "another component content")
    render StandardComponent.new do
      text
    end
  end

  # This is a note about the third example
  def third_example
    render StandardComponent.new do
      "third component content"
    end
  end
end
