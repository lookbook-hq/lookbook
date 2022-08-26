class CopyButtonComponentPreview < ViewComponent::Preview
  def block_content
    render Lookbook::CopyButton::Component.new do
      "Some content to copy"
    end
  end
end
