class ViewComponentExamplePreview < Lookbook::Preview
  def default
    render StandardComponent.new title: "viewcomponent component"
  end
end
