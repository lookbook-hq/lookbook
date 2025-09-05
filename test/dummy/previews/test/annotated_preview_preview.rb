# @id annotated_test
# @label Annotated Label
# @unregistered this tag is not recognised
# @customtag a custom tag
# @customtag another instance of it
# @logical_path foo/bar
# @renders ViewComponents::ParagraphComponent
# @renders InlineComponent
# @renders MadeUpComponent
class AnnotatedPreviewPreview < ViewComponent::Preview
  # @id annotated-default
  # @label Annotated Example
  # @hidden
  # @unregistered this tag is not recognised
  # @customtag a custom tag
  # @customtag another instance of it
  def default
    render ViewComponents::ParagraphComponent.new do
      "standard component content"
    end
  end

  # @label Param scenario
  # @param text
  def another_scenario(text: "another component content")
    render ViewComponents::ParagraphComponent.new do
      text
    end
  end

  # This is a note about the third scenario
  def third_scenario
    render ViewComponents::ParagraphComponent.new do
      "third component content"
    end
  end
end
