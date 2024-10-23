class MultilineTagComponentPreview < ViewComponent::Preview
  def default
    render MultilineTagComponent.new src: "https://loremflickr.com/200/200"
  end
end
