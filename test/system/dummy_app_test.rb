require "lookbook_system_test"

class DummyAppTest < LookbookSystemTest
  test "landing on the home page and navigating to the Lookbook UI" do
    visit "/"

    assert_element "h1", text: "Lookbook dummy app"

    click_on("lookbook-link")

    assert_current_path("/lookbook")

    assert_selector "#app"
  end
end
