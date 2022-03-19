require "test_helper"

module Lookbook
  class PreviewAnnotationsTest < ActiveSupport::TestCase
    include LookbookTestHelper

    setup do
      @preview = find_preview("annotated")
    end

    context "preview" do
      should "have a custom label" do
        assert @preview.label == "Custom"
      end

      should "have expected display params" do
        display_params = @preview.display_params
        assert display_params["max_width"] == "500px"
        assert display_params["with_wrapper"] == true
        assert display_params["foo_count"] == 12
      end
    end

    context "hidden example" do
      setup do
        @example = @preview.example("hidden")
      end

      should "still be in list of examples" do
        assert @example.present?
      end

      should "be marked as hidden" do
        assert @example.hidden?
      end
    end

    context "labelled example" do
      setup do
        @example = @preview.example("labelled")
      end

      should "have a custom label" do
        assert @example.label == "Relabelled"
      end
    end

    context "example with notes" do
      setup do
        @example = @preview.example("with_notes")
      end

      should "have notes" do
        assert @example.notes.include?("Some notes about this example")
      end
    end

    context "grouped examples" do
      setup do
        @example = @preview.example("misc")
      end

      should "be bundled as a group" do
        assert @example.type == :group
        assert @example.examples.find { |e| e.name == "misc_one" }.present?
        assert @example.examples.find { |e| e.name == "misc_two" }.present?
      end

      should "not appear on their own" do
        assert @preview.example("misc_one").nil?
        assert @preview.example("misc_two").nil?
      end
    end

    context "grouped examples - unnamed" do
      setup do
        @example = @preview.examples.find { |e| e.type == :group && e.label != "Misc" }
      end

      should "inherit their name from the preview" do
        assert @example.label == @preview.label
      end
    end
  end
end
