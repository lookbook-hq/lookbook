class ViewComponentsPreview < ViewComponent::Preview
  def paragraph
    render ViewComponents::ParagraphComponent.new do
      "A paragraph"
    end
  end
end
