class ViewComponentExamplePreview < Lookbook::Preview
  def default
    render BasicComponent.new
  end

  def transform
    render_args = render BasicComponent.new
    render_args[:output_transformer] = ->(html) { "<span>transformed</span>#{html}".html_safe }
    render_args
  end
end
