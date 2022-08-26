# @label Resizable viewport
# @display centered true
# @display max_height 600px
class ViewportComponentPreview < ViewComponent::Preview
  include Lookbook::Engine.routes.url_helpers

  def default
    render Lookbook::Viewport::Component.new src: lookbook_preview_path("dimensions_display/default")
  end

  def resize_height_only
    render Lookbook::Viewport::Component.new(
      src: lookbook_preview_path("dimensions_display/default"),
      resize_height: false
    )
  end

  def resize_width_only
    render Lookbook::Viewport::Component.new(
      src: lookbook_preview_path("dimensions_display/default"),
      resize_width: false
    )
  end
end
