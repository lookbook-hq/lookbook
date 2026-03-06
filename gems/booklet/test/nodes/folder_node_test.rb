require "support/test_helper"

module Booklet
  class FolderNodeTest < Minitest::Test
    subject { FolderNode }

    context "class methods" do
      context "FolderNode::from" do
        context "called with a path that is not a directory" do
          should "raise an exception " do
            file_path = Fixtures.file("mixed/overview.md")

            assert_raises(ArgumentError) { subject.from(file_path) }
          end
        end

        context "called with a directory path" do
          should "return a FolderNode instance " do
            file_path = Fixtures.dir("mixed/docs")

            assert_kind_of subject, subject.from(file_path)
          end
        end
      end
    end

    context "instance methods" do
      setup do
        @fixture_file = Fixtures.file("mixed")
        @node = subject.from(@fixture_file)
      end

      context "FolderNode#path" do
        should "return the path as a pathname" do
          assert_equal @fixture_file, @node.path
          assert_kind_of Pathname, @node.path
        end
      end

      context "FolderNode#file?" do
        should "return false" do
          refute @node.file?
        end
      end

      context "FolderNode#directory?" do
        should "return true" do
          assert @node.directory?
        end
      end
    end
  end
end
