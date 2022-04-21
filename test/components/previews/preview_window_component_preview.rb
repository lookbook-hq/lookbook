class PreviewWindowComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::PreviewWindow::Component.new(src: "https://example.com")
  end
end
