require "test_helper"

module Lookbook
  class PreviewTest < ActiveSupport::TestCase
    include LookbookTestHelper

    setup do
      @previews = Lookbook::Preview.all
    end

    context "list of previews" do
      should "include previews from all preview directories" do
        assert @previews.size == all_preview_files.size
      end
    end

    context "a basic preview" do
      setup do
        @preview = find_preview("basic")
      end

      should "have a label based on it's name" do
        assert @preview.label == "Basic"
      end

      context "example" do
        setup do
          @example = @preview.example("default")
        end

        should "have a label based on it's name" do
          assert @example.label == "Default"
        end
      end
    end
  end
end
