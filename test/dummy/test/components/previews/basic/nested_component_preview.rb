class Basic::NestedComponentPreview < ViewComponent::Preview
  def default
    render BasicComponent.new
  end
end
