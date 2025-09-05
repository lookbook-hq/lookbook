require "test_helper"

class PartialsTest < ActionDispatch::IntegrationTest
  test "renders view partial previews" do
    get lookbook_preview_path("partial_rendering/default")

    assert_element "p", text: "view partial"
  end

  test "supports helpers" do
    skip("helpers setup in test app needs fixing")

    get lookbook_preview_path("partial_rendering/helpers")

    assert_link "/"
  end

  test "has access to host app url helpers" do
    skip("helpers setup in test app needs fixing")

    get lookbook_preview_path("partial_rendering/url_helpers")

    assert_link "/blog"
  end

  test "does not support content_for by default" do
    get lookbook_preview_path("partial_rendering/content_for")

    refute response.body.include?("<title>Page title using content_for</title>")
  end

  test "supports content_for with single-pass rendering" do
    Lookbook.config.preview_single_pass_rendering = true

    get lookbook_preview_path("partial_rendering/content_for")

    assert response.body.include?("<title>Page title using content_for</title>")

    Lookbook.config.preview_single_pass_rendering = false
  end
end
