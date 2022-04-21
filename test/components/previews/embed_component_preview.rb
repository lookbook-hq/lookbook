class EmbedComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Embed::Component.new
  end
end
