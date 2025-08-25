require "test_helper"

module Lookbook
  class WhitespaceTest < ActionDispatch::IntegrationTest
    it "doesn't reformat HTML in the rendered output" do
      get lookbook_preview_path("test_suite_previews/whitespace_significant/default")

      assert response.body.include?("<div>one</div><div>two</div><div>three</div>")
    end
  end
end
