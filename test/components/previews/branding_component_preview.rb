class BrandingComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Branding::Component.new text: "Lookbook"
  end
end
