require "support/test_helper"

module Booklet
  class IssueAggregatorTest < Minitest::Test
    context "issue aggregator" do
      setup do
        @root = Node.new
        @child = Node.new
        @child_2 = Node.new
        @grandchild = Node.new

        @root << @child
        @root << @child_2 << @grandchild
      end

      should "collect issues from all nodes into a single issue list" do
        @root.add_warning("root warning")
        @child_2.add_error("child_2 error")
        @grandchild.add_error(ArgumentError.new("grandchild error"))
        @grandchild.add_warning("grandchild warning")
        @child_2.add_warning("child_2 warning 2")

        issues = @root.accept(IssueAggregator.new)

        assert issues.any?
        assert_equal 5, issues.count

        assert issues.warnings?
        assert_equal 3, issues.warnings.count

        assert issues.errors?
        assert_equal 2, issues.errors.count
      end
    end
  end
end
