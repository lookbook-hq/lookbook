# @label Toolbar Button
class ButtonComponentPreview < ViewComponent::Preview
  # @!group Examples

  def default
    render Lookbook::Button::Component.new icon: :book
  end

  # @label With Tooltip
  #
  # The tooltip appears when hovering over the button.
  def tooltip
    render Lookbook::Button::Component.new icon: :book, tooltip: "An example tooltip"
  end

  # @!endgroup

  # @param icon select [book, [refresh, refresh_cw], [thumbs up, thumbs_up], [check box, check_square]]
  # @param size select [sm,md,lg]
  # @param tooltip
  def playground(icon: :book, size: :md, tooltip: "An example tooltip")
    render Lookbook::Button::Component.new icon: icon, size: size, tooltip: tooltip
  end
end
