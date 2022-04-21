class CodeComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Code::Component.new do
      "<div>Some code</div>"
    end
  end
end
