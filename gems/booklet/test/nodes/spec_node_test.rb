require "support/test_helper"

module Booklet
  class SpecNodeTest < Minitest::Test
    subject { SpecNode }

    context "class methods" do
      context "SpecNode::from" do
        context "called with a path that is not a preview class file" do
          should "raise an exception" do
            file_path = Fixtures.file("mixed/overview.md")

            assert_raises(ArgumentError) { subject.from(file_path) }
          end
        end

        context "called with preview class file path" do
          should "return a SpecNode instance" do
            file_path = Fixtures.file("specs/example_preview.rb")

            assert_kind_of subject, subject.from(file_path)
          end
        end

        context "called with booklet spec file path" do
          should "return a SpecNode instance" do
            file_path = Fixtures.file("specs/example_booklet.rb")

            assert_kind_of subject, subject.from(file_path)
          end
        end

        context "file with syntax error" do
          should "return a SpecNode instance" do
            file_path = Fixtures.file("mixed/components/syntax_error_preview.rb")

            assert_kind_of subject, subject.from(file_path)
          end
        end
      end
    end
  end
end
