require "test_helper"

module Lookbook
  class UIIntegrationTest < ActionDispatch::IntegrationTest
    describe "Page not found" do
      it "returns the correct status" do
        get "/does-not-exist"

        assert_response :missing
      end
    end
  end
end
