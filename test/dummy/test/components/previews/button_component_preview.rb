class ButtonComponentPreview < Lookbook::Preview
  def default
    render ButtonComponent.new do
      "Click me"
    end
  end
end
