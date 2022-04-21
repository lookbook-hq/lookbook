class ButtonGroupComponentPreview < ViewComponent::Preview
  # @display padded true
  def standard
    render Lookbook::ButtonGroup::Component.new do |group|
      group.button icon: :eye, tooltip: "Show preview"
      group.button icon: :refresh_cw, disabled: true
      group.button icon: :check_circle
    end
  end
end
