require "test_helper"

module Lookbook
  class AppIntegrationTest < ActionDispatch::IntegrationTest
    include LookbookTestHelper
    include Engine.routes.url_helpers

    setup do
      @routes = Engine.routes
    end

    context "#index" do
      setup do
        visit lookbook_url
      end

      should "renders the overview page" do
        assert page.has_content?("Welcome to our Design System.")
      end

      should "include the navigation" do
        assert page.has_css?("#nav-previews")
      end
    end

    context "#show" do
      context "basic" do
        setup do
          @preview = find_preview("basic")
          @example = @preview.examples.first
          @example_path = @example.path
          visit lookbook_inspect_url @example_path
        end

        should "render the correct preview in an iframe" do
          within "#inspector" do
            assert page.has_selector?("iframe[src^='#{lookbook_preview_path @example_path}']")
          end
        end

        should "display the source" do
          within "#inspector-panel-#{@example.id}-source" do
            assert page.has_content?("render BasicComponent.new")
          end
        end

        should "display the output" do
          within "#preview-panel-#{@example.id}-output" do
            assert page.has_content?("basic component")
          end
        end
      end

      context "nested" do
        setup do
          @preview = find_preview("basic/nested")
          visit lookbook_inspect_url example_path(@preview)
        end

        should "display the correct label in the nav" do
          within "#nav-previews" do
            assert page.has_content?(@preview.label)
          end
        end
      end

      context "annotated" do
        setup do
          @preview = find_preview("annotated")
        end

        context "labelled" do
          setup do
            @example_path = example_path(@preview, "labelled")
            visit lookbook_inspect_url @example_path
          end

          should "display the correct label in the nav" do
            within "#nav-previews" do
              assert page.has_selector?("a[href='#{lookbook_inspect_path @example_path}']", text: "Relabelled")
            end
          end
        end

        context "hidden" do
          setup do
            @example_path = example_path(@preview, "hidden")
            visit lookbook_inspect_url @example_path
          end

          should "not display in the nav" do
            within "#nav-previews" do
              assert page.has_no_selector?("a[href='#{lookbook_inspect_path @example_path}']")
            end
          end
        end

        context "with notes" do
          setup do
            @example = @preview.example("with_notes")
            @example_path = @example.path
            visit lookbook_inspect_url @example_path
          end

          should "renders the notes as markdown" do
            within "#inspector-panel-#{@example.id}-notes" do
              assert page.has_content?("Some notes about this example")
              assert page.has_no_content?("@label Noted")
              assert page.has_selector?("strong", text: "markdown")
            end
          end
        end

        context "with params" do
          setup do
            @preview = find_preview("param")
          end

          context "default param type" do
            setup do
              @example = @preview.example("default_input")
              visit lookbook_inspect_url @example.path
            end

            should "render a text input" do
              within "#inspector-panel-#{@example.id}-params" do
                assert page.has_field?("blurb", type: "text", with: "default text")
              end
            end
          end

          context "text param" do
            setup do
              @example = @preview.example("text_input")
              visit lookbook_inspect_url @example.path
            end

            should "render a text input" do
              within "#inspector-panel-#{@example.id}-params" do
                assert page.has_field?("blurb", type: "text", with: "default text")
              end
            end
          end

          context "textarea param" do
            setup do
              @example = @preview.example("textarea_input")
              visit lookbook_inspect_url @example.path
            end

            should "render a textarea" do
              within "#inspector-panel-#{@example.id}-params" do
                assert page.has_css?("textarea[name='blurb']", text: "default text")
              end
            end
          end

          context "select param" do
            setup do
              @example = @preview.example("select_input")
              visit lookbook_inspect_url @example.path
            end

            should "render a select" do
              within "#inspector-panel-#{@example.id}-params" do
                assert page.has_select?("blurb", with_selected: "option one", with_options: ["option one", "option two"])
              end
            end
          end
        end
      end

      context "preview not found" do
        setup do
          visit lookbook_inspect_url "foo/bar"
        end

        should "display the 'preview not found' message" do
          assert page.has_selector?("[data-role='preview-not-found']")
        end
      end
    end

    context "#preview" do
      context "basic" do
        setup do
          visit lookbook_preview_url example_path("basic")
        end

        should "use the default layout" do
          assert page.has_title?("Preview Layout")
        end
      end

      context "templated" do
        setup do
          visit lookbook_preview_url example_path("templated")
        end

        should "render the preview template" do
          assert page.has_content?("preview template")
        end
      end

      context "with display params" do
        setup do
          visit lookbook_preview_url example_path("annotated", "with_display_params")
        end

        should "have all the display params set" do
          assert page.has_content?("text_color=red")
          assert page.has_content?("max_width=500px")
          assert page.has_content?("with_wrapper=true")
          assert page.has_content?("bg_color=#fff")
          assert page.has_content?("foo_count=100")
        end
      end

      context "with custom layout" do
        context "ungrouped" do
          setup do
            visit lookbook_preview_url example_path("custom_layout")
          end

          should "use the custom layout" do
            assert page.has_title?("Custom Layout")
          end
        end

        context "grouped" do
          setup do
            visit lookbook_preview_url example_path("custom_layout", "test")
          end

          should "use the custom layout" do
            assert page.has_title?("Custom Layout")
          end

          should "render all components in the group" do
            assert page.has_content?("Test one")
            assert page.has_content?("Test two")
          end
        end
      end

      context "hidden" do
        setup do
          visit lookbook_preview_url example_path("annotated", "hidden")
        end

        should "still be rendered" do
          assert page.has_content?("basic component")
        end
      end

      context "grouped" do
        setup do
          visit lookbook_preview_url example_path("annotated", "misc")
        end

        should "render all components in the group" do
          assert page.has_content?("Misc one")
          assert page.has_content?("Misc two")
        end

        should "not include components in other groups" do
          assert page.has_no_content?("Misc three")
          assert page.has_no_content?("Misc four")
        end

        should "use the default layout" do
          assert page.has_title?("Preview Layout")
        end
      end
    end

  end
end
