require "support/test_helper"

module Booklet
  class AssetNodeTest < Minitest::Test
    subject { AssetNode }

    context "class methods" do
      context "AssetNode::from" do
        context "called with a path that is not an asset" do
          should "raise an exception" do
            file_path = Fixtures.file("mixed/overview.md")

            assert_raises(ArgumentError) { subject.from(file_path) }
          end
        end

        context "called with an image path" do
          should "return a AssetNode instance" do
            file_path = Fixtures.file("mixed/chunky_bacon.png")

            assert_kind_of subject, subject.from(file_path)
          end
        end

        context "called with an JS file path" do
          should "return a AssetNode instance" do
            file_path = Fixtures.file("mixed/assets/foxes.js")

            assert_kind_of subject, subject.from(file_path)
          end
        end

        context "called with an CSS file path" do
          should "return a AssetNode instance" do
            file_path = Fixtures.file("mixed/assets/cloneberries.css")

            assert_kind_of subject, subject.from(file_path)
          end
        end
      end
    end
  end
end
