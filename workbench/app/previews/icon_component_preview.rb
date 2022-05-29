class IconComponentPreview < ViewComponent::Preview
  
  # @param icon select icons.json
  def default(icon: :book)
    render Lookbook::Icon::Component.new name: icon
  end
end
