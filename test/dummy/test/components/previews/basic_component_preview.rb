class BasicComponentPreview < ViewComponent::Preview
  def default
    render BasicComponent.new
  end
end
