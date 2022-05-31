class HeaderComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Header::Component.new do |header|
      header.branding { "Workbench" }
    end
  end
end
