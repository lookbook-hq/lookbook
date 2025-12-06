require "lookbook_test"

module Lookbook
  class NodeTest < LookbookTest
    describe "default" do
      test "is a leaf node (does not accept children)" do
        node = Node.new

        assert_equal [], node.children
        assert_raises { node << Node.new }
      end
    end

    describe "with child node types defined" do
      test "accepts children of the allowed types" do
        node = Node.new
        node.accept_children_of_type Node

        assert_equal [], node.children

        child = node << Node.new
        assert node.children.include?(child)
      end
    end
  end
end
