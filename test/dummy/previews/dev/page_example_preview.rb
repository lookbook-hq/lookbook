# @label Full page example
# @renders pages/example.html.erb
class PageExamplePreview < Lookbook::Preview
  # @param title text
  def default(title: "Full page preview")
    render template: "pages/example", assigns: {title: title}
  end
end
