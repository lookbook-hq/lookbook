class CodeComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::Code::Component.new language: "html" do
      %(
        <p>This is some highlighted code</p>
      )
    end
  end
end
