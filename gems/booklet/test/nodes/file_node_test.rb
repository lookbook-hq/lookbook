require "support/test_helper"

module Booklet
  class FileNodeTest < Minitest::Test
    subject { FileNode }

    context "instance methods" do
      setup do
        @fixture_file = Fixtures.file("mixed/overview.md")
        @node = subject.from(@fixture_file)
      end

      context "FileNode#path" do
        should "return the path as a pathname" do
          assert_equal @fixture_file, @node.path
          assert_kind_of Pathname, @node.path
        end
      end
    end
  end
end
