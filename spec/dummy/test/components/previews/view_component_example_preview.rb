class ViewComponentExamplePreview < Lookbook::Preview
  def default
    render BasicComponent.new
  end
end
