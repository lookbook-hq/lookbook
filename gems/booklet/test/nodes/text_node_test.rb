require "support/test_helper"

module Booklet
  class TextNodeTest < Minitest::Test
    context "TextNode" do
      setup do
        @text = "Some markdown content"
        @node = TextNode.new(@text)
      end

      context "#to_s" do
        should "return the raw text content" do
          assert_equal @text, @node.to_s
        end
      end
    end
  end
end
