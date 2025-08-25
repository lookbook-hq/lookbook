require "test_helper"

module Lookbook
  class DemoSystemTest < ApplicationSystemTestCase
    describe "Demo home page" do
      it "shows the title" do
        visit "/"

        assert_element "h1", text: "Lookbook dummy app"
      end
    end
  end
end
