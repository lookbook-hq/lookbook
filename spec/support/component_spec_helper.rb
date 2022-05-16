module ComponentSpecHelper
  def html
    Capybara.string(rendered_component)
  end
end
