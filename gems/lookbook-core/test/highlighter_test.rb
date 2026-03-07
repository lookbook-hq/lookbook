require "support/test_helper"

module Lookbook
  class HighlighterTest < Minitest::Test
    context "Lookbook::highlight" do
      should "highlight code" do
        result = Lookbook.highlight("<p>foo</p>", lang: :html, theme: "github-dark-default")
        pd result
        assert_kind_of String, result
      end
    end
  end
end
