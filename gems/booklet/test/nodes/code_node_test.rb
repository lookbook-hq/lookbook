require "support/test_helper"

module Booklet
  class CodeNodeTest < Minitest::Test
    context "CodeNode" do
      setup do
        @source = "foo = bar(:baz)"
        @node = CodeNode.new(@source)
      end

      context "#to_s" do
        should "return the raw source code" do
          assert_equal @source, @node.to_s
        end
      end
    end
  end
end
