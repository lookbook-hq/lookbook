class PartialExamplePreview < Lookbook::Preview
  def default
    render "partials/basic_example"
  end

  def helpers
    render "partials/helpers_example"
  end

  def content_for
    render "partials/content_for_example"
  end

  def url_helpers
    render "partials/url_helpers_example"
  end
end
