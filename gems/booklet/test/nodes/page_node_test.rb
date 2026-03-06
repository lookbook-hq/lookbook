require "support/test_helper"

module Booklet
  class PageNodeTest < Minitest::Test
    subject { PageNode }

    context "instance methods" do
      setup do
        @fixture_file = Fixtures.file("pages/basic_page.md")
        @file_contents = File.read(@fixture_file)
        @page = subject.from(@fixture_file)
      end

      context "PageNode#contents" do
        should "return the page file contents as a string" do
          assert_equal @file_contents, @page.content
        end
      end

      context "PageNode#to_html" do
        should "convert the contents from markdown to html" do
          assert @page.to_html.include?("<p>#{@file_contents.strip}</p>")
        end
      end
    end

    context "class methods" do
      context "PageNode::from" do
        context "called with a path that is not a markdown document" do
          should "raise an exception" do
            file_path = Fixtures.file("mixed/_tmp.txt")

            assert_raises(ArgumentError) { subject.from(file_path) }
          end
        end

        context "called with a markdown file path" do
          should "return a PageNode instance" do
            file_path = Fixtures.file("mixed/overview.md")

            assert_kind_of subject, subject.from(file_path)
          end
        end

        context "called with an markdown ERB file path" do
          should "return a PageNode instance" do
            file_path = Fixtures.file("mixed/docs/further_reading.md.erb")

            assert_kind_of subject, subject.from(file_path)
          end
        end
      end
    end
  end
end
