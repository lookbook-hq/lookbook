class ButtonComponentPreview < ViewComponent::Preview
  # @!group

  # @param icon (see IconComponentPreview#default)
  # @display padded true
  def standard(icon: :refresh_cw)
    render Lookbook::Button::Component.new(icon: icon)
  end

  # @label With Tooltip
  # The tooltip is displayed when the user hovers the mouse over the button.
  #
  # @param (see #standard)
  # @display (see #standard)
  def tooltip(icon: :refresh_cw, tooltip: "A short description")
    render Lookbook::Button::Component.new(icon: icon, tooltip: tooltip)
  end

  # @param (see #standard)
  # @display (see #standard)
  def disabled(icon: :refresh_cw)
    render Lookbook::Button::Component.new(icon: icon, disabled: true)
  end

  # @!endgroup
end
