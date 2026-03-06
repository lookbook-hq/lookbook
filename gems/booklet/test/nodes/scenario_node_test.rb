require "support/test_helper"

module Booklet
  class ScenarioNodeTest < Minitest::Test
    context "ScenarioNode" do
      setup do
        @scenario = ScenarioNode.new(name: "example")
      end

      context "#spec" do
        should "be an alias for parent" do
          spec = spec_from_fixture("specs/example_preview.rb")
          scenario = spec.scenarios.first

          assert_equal spec, scenario.spec
          assert_equal scenario.parent, scenario.spec
        end
      end

      context "#display_options" do
        should "return an Options object" do
          assert_kind_of Options, @scenario.display_options
        end
      end

      # context "properties" do
      #   should "have a group property" do
      #     @scenario.group = "my-group"
      #     assert_equal "my-group", @scenario.group
      #   end

      #   should "have a notes property" do
      #     @scenario.notes = TextSnippet.new("Some notes")
      #     assert_kind_of TextSnippet, @scenario.notes
      #   end

      #   should "have a source property" do
      #     @scenario.source = "render Component.new"
      #     assert_equal "render Component.new", @scenario.source
      #   end
      # end

      context "concerns" do
        should "be nameable" do
          assert_equal "example", @scenario.name
          assert_equal "Example", @scenario.label
        end

        should "be hideable" do
          refute @scenario.hidden?
          @scenario.hidden = true
          assert @scenario.hidden?
        end

        should "accept params" do
          assert_kind_of ParamSet, @scenario.params
        end
      end
    end
  end
end
