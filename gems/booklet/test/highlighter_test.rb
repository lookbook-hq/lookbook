require "support/test_helper"

module Booklet
  class HighlighterTest < Minitest::Test
    context "Booklet::highlight" do
      should "highlight code" do
        result = Booklet.highlight("<p>foo</p>", lang: :html, theme: "github-dark-default")
        pd result
        assert_kind_of String, result
      end
    end
  end
end
