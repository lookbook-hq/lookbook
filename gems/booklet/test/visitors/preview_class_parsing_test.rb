require "support/test_helper"

module Booklet
  class PreviewClassParserTest < Minitest::Test
    context "Preview classes" do
      setup do
        @spec = spec_from_fixture("specs/example_preview.rb")
      end

      context "tags" do
        should "be hidden" do
          assert_equal true, @spec.hidden?
        end
      end

      context "scenarios" do
        should "be created for each public instance method" do
          assert_equal ["default", "with_notes", "no_notes", "with_tags"], @spec.scenarios.map { _1.name }

          @spec.scenarios.each do |node|
            assert_kind_of ScenarioNode, node
          end
        end

        should "not be created for private methods" do
          refute @spec.scenarios.find { _1.name == "not_a_scenario" }
        end
      end

      context "`default` scenario" do
        setup do
          @scenario = @spec.scenarios.find { _1.name == "default" }
        end

        should "have a source snippet" do
          assert_kind_of CodeNode, @scenario.source
          assert_equal "render ExampleComponent.new", @scenario.source.to_s
        end

        should "have display options inherited from spec" do
          assert_kind_of Options, @scenario.display_options

          assert_equal "green", @scenario.display_options.text
        end
      end

      context "`with_notes` scenario" do
        setup do
          @scenario = @spec.scenarios.find { _1.name == "with_notes" }
        end

        should "have notes" do
          assert_kind_of TextNode, @scenario.notes
          assert_equal "Notes specific to the _with notes_ scenario.", @scenario.notes.to_s
        end
      end

      context "`no_notes` scenario" do
        setup do
          @scenario = @spec.scenarios.find { _1.name == "no_notes" }
        end

        should "not have notes" do
          assert_nil @scenario.notes
        end
      end

      context "scenario with tags" do
        setup do
          @scenario = @spec.scenarios.find { _1.name == "with_tags" }
        end

        should "have notes" do
          assert @scenario.notes.present?
        end

        should "be hidden" do
          assert_equal true, @scenario.hidden?
        end

        should "be labelled" do
          assert_equal "Tags Example", @scenario.label
        end

        should "have display options" do
          assert_kind_of Options, @scenario.display_options

          assert_equal "white", @scenario.display_options.text
          assert_equal "bg-pink", @scenario.display_options.attrs.class_name
        end

        should "have params" do
          assert_kind_of ParamSet, @scenario.params
        end

        context "params" do
          setup do
            @name_param = @scenario.params.find!(:name)
            @text_param = @scenario.params.find!(:text)
            @size_param = @scenario.params.find!(:size)
            @theme_param = @scenario.params.find!(:theme)
            @icon_param = @scenario.params.find!(:icon)
          end

          should "extract param descriptions when available" do
            assert_equal "The text to display", @text_param.description
            assert_nil @size_param.description
          end

          should "identify required params" do
            assert @name_param.required?
            refute @size_param.required?
          end

          should "resolve default values" do
            assert_nil @name_param.default_value
            assert_equal "default text", @text_param.default_value
            assert_equal :medium, @size_param.default_value
            assert_equal "sparkly", @theme_param.default_value
          end

          context "options" do
            should "be resolved from YAML" do
              assert_kind_of Options, @size_param.options
              assert_equal ["small", "medium", "large"], @size_param.options.choices
            end

            should "be resolved from instance methods using `:method_name` declarations" do
              assert_kind_of Options, @theme_param.options
              assert_kind_of Array, @theme_param.options.choices
              assert_equal ["Default", "sparkly"], @theme_param.options.choices.first
            end

            should "be resolved from `{{ statement }}` syntax declarations" do
              assert_kind_of Options, @icon_param.options
              assert_equal "Example icon", @icon_param.options.label
              assert_equal "Example icon", @icon_param.label
            end
          end
        end
      end
    end

    context "with scenario groups" do
      setup do
        @grouped_spec = spec_from_fixture("specs/grouped_preview.rb",
          visitors: [PreviewClassParser, YardTagsHandler, ScenarioGrouper])
      end

      should "have a scenario added for each group" do
        @group = @grouped_spec.scenarios.find { _1.name == "sizes" }

        assert_kind_of ScenarioNode, @group
        assert_equal "Sizes", @group.label
      end
    end
  end
end
