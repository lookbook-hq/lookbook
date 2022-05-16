module ComponentsHelper
  def rendered_html
    Capybara.string(rendered_component)
  end
end
