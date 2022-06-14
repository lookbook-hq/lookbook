require "test_helper"

module Lookbook
  class PageTest < ActiveSupport::TestCase
    include LookbookTestHelper

    DOCS_PATH = Lookbook::Engine.root.join("test/dummy/test/components/docs")

    setup do
      Lookbook.config.page_paths = [DOCS_PATH]
    end

    context "all" do
      should "find pages only" do
        pages = Page.all.items
        assert pages.length == 2
      end

      should "add tabs to related page" do
        avatar = Page.all.items.find { |page| page.path == "avatar" }
        assert avatar.tabs.length == 3
      end

      should "sort tabs by position and label" do
        avatar = Page.all.items.find { |page| page.path == "avatar" }
        assert avatar.tabs[0].label == "Web Dev" # Position 1 (using position)
        assert avatar.tabs[1].label == "Design"  # Position 2 (using label)
        assert avatar.tabs[2].label == "Mobile"  # Position 2 (using label)
      end
    end

    context "options" do
      should "set page label from frontmatter" do
        page = Page.new("#{DOCS_PATH}/02_avatar.md.erb", DOCS_PATH)
        assert page.label == "Avatar Docs"
      end

      should "set tab label from frontmatter" do
        page = Page.new("#{DOCS_PATH}/02_avatar[web].md.erb", DOCS_PATH)
        assert page.label == "Web Dev"
      end

      should "set tab label from tab name" do
        page = Page.new("#{DOCS_PATH}/02_avatar[mobile].md.erb", DOCS_PATH)
        assert page.label == "Mobile"
      end
    end
  end
end
