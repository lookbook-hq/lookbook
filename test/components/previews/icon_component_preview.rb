class IconComponentPreview < ViewComponent::Preview
  # @param icon select [book, eye, refresh_cw, zap, smile]
  # @param size number
  # @display padded true
  def default(icon: :book, size: 10)
    render Lookbook::Icon::Component.new(icon, size: size)
  end
end
