class PartialExamplePreview < Lookbook::Preview
  def default
    render "partials/basic_example"
  end

  def helpers
    render "partials/helpers_example"
  end

  def transform
    render_args = render "partials/basic_example"
    render_args[:output_transformer] = ->(html) { "<span>transformed</span>#{html}".html_safe }
    render_args
  end
end
