require "support/test_helper"

module Lookbook::Core
  class HighlighterTest < Minitest::Test
    context "Lookbook::Core::highlight" do
      should "highlight code" do
        result = Lookbook::Core.highlight("<p>foo</p>", lang: :html, theme: "github-dark-default")
        pd result
        assert_kind_of String, result
      end
    end
  end
end
