require "test_helper"

module Lookbook
  class PageTest < ActiveSupport::TestCase
    include LookbookTestHelper

    setup do
      Lookbook.config.page_paths = ["./test/dummy/test/components/docs"]
    end

    context "all" do
      should "find pages only" do
        pages = Page.all.items
        assert pages.length == 2
      end

      should "add tabs to related page" do
        avatar = Page.all.items.find { |page| page.path == "avatar" }
        assert avatar.tabs.length == 2
      end
    end
  end
end
