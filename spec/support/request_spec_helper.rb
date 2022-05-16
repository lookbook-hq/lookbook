module RequestSpecHelper
  def html
    Capybara.string(response.body)
  end
end
