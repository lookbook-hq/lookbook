require "support/test_helper"

module Booklet
  class FrontmatterExtractorTest < Minitest::Test
    context "Page without frontmatter" do
      setup do
        @page_path = Fixtures.file("pages/basic_page.md")
        @page = page_from_fixture("pages/basic_page.md")
      end

      context "PageNode#contents" do
        should "return the entire contents of the file" do
          assert_equal File.read(@page_path).strip, @page.content.strip
        end
      end
    end

    context "Page with frontmatter" do
      context "valid frontmatter" do
        setup do
          @page = page_from_fixture("pages/page_with_frontmatter.md")
        end

        context "page label" do
          should "be set from the frontmatter" do
            assert_equal "Page label", @page.label
          end
        end

        context "page title" do
          should "be set from the frontmatter" do
            assert_equal "Title for the Page", @page.title
          end
        end

        context "page hidden status" do
          should "be set from the frontmatter" do
            assert_equal true, @page.hidden
          end
        end

        context "page data" do
          should "be set from the frontmatter" do
            assert_kind_of Options, @page.data
            assert_equal "baz", @page.data.foo.bar
          end
        end

        context "PageNode#contents" do
          should "return the file contents without the frontmatter section" do
            assert_equal "Page contents", @page.content
          end
        end
      end
    end
  end
end
