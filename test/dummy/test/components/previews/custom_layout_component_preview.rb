class CustomLayoutComponentPreview < ViewComponent::Preview
  layout "component_preview"

  def default
    render BasicComponent.new
  end
end
