class PartialExamplePreview < Lookbook::Preview
  def default
    render "partials/basic_example"
  end

  def helpers
    render "partials/helpers_example"
  end
end
