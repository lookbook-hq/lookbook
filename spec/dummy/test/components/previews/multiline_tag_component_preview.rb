class MultilineTagComponentPreview < ViewComponent::Preview
  def default
    render MultilineTagComponent.new src: "https://placekitten.com/200/200"
  end
end
