class ProseComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Prose::Component.new do
      "Some prose"
    end
  end
end
