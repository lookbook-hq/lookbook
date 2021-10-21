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

      should "render the welcome content" do
        assert page.has_content?("Select a preview to get started")
      end

      should "include the navigation" do
        assert page.has_css?("#nav")
      end
    end

    context "#show" do
      context "basic" do
        setup do
          @preview = find_preview("basic")
          @example_path = example_path(@preview)
          visit show_url @example_path
        end

        should "display the correct preview example" do
          within "#workbench header" do
            assert page.has_content?(@preview.label)
          end
        end

        should "render the preview in an iframe" do
          within "#workbench" do
            assert page.has_selector?("iframe[src='#{preview_path @example_path}']")
          end
        end

        should "display the source" do
          within "#inspector-content-source" do
            assert page.has_content?("render BasicComponent.new")
          end
        end

        should "display the output" do
          within "#inspector-content-output" do
            assert page.has_content?("basic component")
          end
        end
      end

      context "nested" do
        setup do
          @preview = find_preview("basic/nested")
          visit show_url example_path(@preview)
        end

        should "display the correct preview example" do
          within "#workbench header" do
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
            visit show_url @example_path
          end

          should "display the correct label in the workbench" do
            within "#workbench header" do
              assert page.has_content?("Relabelled")
            end
          end

          should "display the correct label in the nav" do
            within "#nav" do
              assert page.has_selector?("a[href='#{show_path @example_path}']", text: "Relabelled")
            end
          end
        end

        context "hidden" do
          setup do
            @example_path = example_path(@preview, "hidden")
            visit show_url @example_path
          end

          should "not display in the nav" do
            within "#nav" do
              assert page.has_no_selector?("a[href='#{show_path @example_path}']")
            end
          end
        end

        context "with notes" do
          setup do
            @example_path = example_path(@preview, "with_notes")
            visit show_url @example_path
          end

          should "renders the notes as markdown" do
            within "#inspector-content-notes" do
              assert page.has_content?("Some notes about this example")
              assert page.has_no_content?("@label Noted")
              assert page.has_selector?("strong", text: "markdown")
            end
          end
        end
      end

      context "preview not found" do
        setup do
          visit show_url "foo/bar"
        end

        should "display the 'preview not found' message" do
          assert page.has_selector?("[data-role='preview-not-found']")
        end
      end
    end

    context "#preview" do
      context "basic" do
        setup do
          visit preview_url example_path("basic")
        end

        should "use the default layout" do
          assert page.has_title?("App Layout")
        end
      end

      context "templated" do
        setup do
          visit preview_url example_path("templated")
        end

        should "render the preview template" do
          assert page.has_content?("preview template")
        end
      end

      context "with display params" do
        setup do
          visit preview_url example_path("annotated", "with_display_params")
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
        setup do
          visit preview_url example_path("custom_layout")
        end

        should "use the custom layout" do
          assert page.has_title?("Custom Layout")
        end
      end

      context "hidden" do
        setup do
          visit preview_url example_path("annotated", "hidden")
        end

        should "still be rendered" do
          assert page.has_content?("basic component")
        end
      end

      context "grouped" do
        setup do
          visit preview_url example_path("annotated", "misc")
        end

        should "render all components in the group" do
          assert page.has_content?("Misc one")
          assert page.has_content?("Misc two")
        end

        should "not include components in other groups" do
          assert page.has_no_content?("Misc three")
          assert page.has_no_content?("Misc four")
        end
      end
    end
  end
end
