require "rails_helper"

RSpec.describe Lookbook::ConfigStore do
  [:development, :production, :test].each do |env|
    context "with '#{env}' defaults" do
      let(:config) do
        Lookbook::ConfigStore.init_from_config(env: env)
      end

      before do
        config = Lookbook::ConfigStore.init_from_config(env: env) # standard:disable Lint/UselessAssignment
      end

      context "project_name" do
        it "defaults to the parent app name" do
          expect(config.project_name).to eq Rails.application.class.module_parent.name.titleize
        end

        it "can be changed" do
          config.project_name = "Foo"

          expect(config.project_name).to eq "Foo"
        end

        it "can be disabled" do
          config.project_name = false

          expect(config.project_name).to be false
        end
      end

      context "project_logo" do
        it "defaults to nil" do
          expect(config.project_logo).to be nil
        end

        it "can be changed" do
          config.project_logo = "<svg></svg>"

          expect(config.project_logo).to eq "<svg></svg>"
        end

        it "can be disabled" do
          config.project_logo = false

          expect(config.project_logo).to be false
        end
      end

      context "log_level" do
        it "is set" do
          expect(config.log_level).to eq 2
        end

        it "can be changed" do
          config.log_level = 3

          expect(config.log_level).to eq 3
        end
      end

      context "log_use_rails_logger" do
        it "is enabled by default" do
          expect(config.log_use_rails_logger).to be true
        end

        it "can be disabled" do
          config.log_use_rails_logger = false

          expect(config.log_use_rails_logger).to be false
        end
      end

      context "component_paths" do
        it "is an array" do
          expect(config.component_paths).to be_a Array
        end

        it "has a default path" do
          expect(config.component_paths).to include "app/views"
        end

        it "can be changed" do
          config.component_paths << "app/foo"

          expect(config.component_paths).to include "app/foo"
        end
      end

      context "page_collection_label" do
        it "is set" do
          expect(config.page_collection_label).to eq "Pages"
        end

        it "can be changed" do
          config.page_collection_label = "Docs"

          expect(config.page_collection_label).to eq "Docs"
        end
      end

      context "page_controller" do
        it "is set" do
          expect(config.page_controller).to eq "Lookbook::PageController"
        end

        it "can be changed" do
          config.page_controller = "MyApp::PageController"

          expect(config.page_controller).to eq "MyApp::PageController"
        end
      end

      context "page_route" do
        it "is set" do
          expect(config.page_route).to eq "pages"
        end

        it "can be changed" do
          config.page_route = "docs"

          expect(config.page_route).to eq "docs"
        end
      end

      context "page_paths" do
        it "is an array" do
          expect(config.page_paths).to be_a Array
        end

        it "has a default path" do
          expect(config.page_paths).to include "test/components/docs"
        end

        it "can have paths appended to it" do
          config.page_paths += ["foo/bar"]
          config.page_paths << "baz/boop"

          expect(config.page_paths).to include "foo/bar"
          expect(config.page_paths).to include "baz/boop"
        end

        it "can be overridden" do
          config.page_paths = ["foo/bar"]

          expect(config.page_paths).not_to include "test/components/docs"
        end
      end

      context "page_options" do
        it "is a hash" do
          expect(config.page_options).to be_a Hash
        end

        it "can be changed" do
          new_opts = {
            some_option: true
          }
          config.page_options = new_opts

          expect(config.page_options).to include new_opts
        end
      end

      context "markdown_options" do
        it "is a hash of options" do
          expect(config.markdown_options).to be_a Hash
        end

        it "can have an individual value changed" do
          config.markdown_options.tables = false

          expect(config.markdown_options.tables).to be false
        end

        it "merges existing options when set as a hash" do
          config.markdown_options = {
            tables: false
          }

          expect(config.markdown_options.tables).to be false
          expect(config.markdown_options.fenced_code_blocks).to be true
        end
      end

      context "highlighter_options" do
        it "is a hash of options" do
          expect(config.highlighter_options).to be_a Hash
        end

        it "merges existing options when set as a hash" do
          config.highlighter_options = {
            theme: :github
          }

          expect(config.highlighter_options.theme).to be :github
          expect(config.highlighter_options.dark).to be false
        end
      end

      context "preview_sort_scenarios" do
        it "is disabled by default" do
          expect(config.preview_sort_scenarios).to be false
        end

        it "can be enabled" do
          config.preview_sort_scenarios = true

          expect(config.preview_sort_scenarios).to be true
        end
      end

      context "preview_collection_label" do
        it "is set" do
          expect(config.preview_collection_label).to eq "Previews"
        end

        it "can be changed" do
          config.preview_collection_label = "Components"

          expect(config.preview_collection_label).to eq "Components"
        end
      end

      context "preview_paths" do
        it "is an array" do
          expect(config.preview_paths).to be_a Array
        end
      end

      context "preview_display_options" do
        it "is a hash" do
          expect(config.preview_display_options).to be_a Hash
        end
      end

      context "preview_disable_action_view_annotations" do
        it "is set" do
          expect(config.preview_disable_action_view_annotations).to be true
        end

        it "can be changed" do
          config.preview_disable_action_view_annotations = false

          expect(config.preview_sort_scenarios).to be false
        end
      end

      context "preview_disable_action_view_partial_prefixes" do
        it "is set" do
          expect(config.preview_disable_action_view_partial_prefixes).to be false
        end

        it "can be changed" do
          config.preview_disable_action_view_partial_prefixes = true

          expect(config.preview_disable_action_view_partial_prefixes).to be true
        end
      end

      context "preview_embeds.enabled" do
        it "defaults to true" do
          expect(config.preview_embeds.enabled).to be true
        end
      end

      context "preview_embeds.policy" do
        it "defaults to permit embeds only on the same origin" do
          expect(config.preview_embeds.policy).to eq "SAMEORIGIN"
        end
      end

      context "listen_paths" do
        it "is an array" do
          expect(config.listen_paths).to be_a Array
        end

        it "can be appended to" do
          config.listen_paths += ["foo/bar"]
          config.listen_paths << "baz/boop"

          expect(config.listen_paths).to include "foo/bar"
          expect(config.listen_paths).to include "baz/boop"
        end

        it "can be set" do
          config.listen_paths = ["foo/bar"]

          expect(config.listen_paths.size).to eq 1
          expect(config.listen_paths).to include "foo/bar"
        end
      end

      context "listen_extensions" do
        it "is an array" do
          expect(config.listen_extensions).to be_a Array
        end

        it "has default extensions" do
          expect(config.listen_extensions).to include "rb"
          expect(config.listen_extensions).to include "html.*"
        end

        it "can have extensions appended to it" do
          config.listen_extensions += ["js"]
          config.listen_extensions << "css"

          expect(config.listen_extensions).to include "js"
          expect(config.listen_extensions).to include "css"
        end

        it "doesn't have the default values overridden when setting to a new array" do
          config.listen_extensions = ["css", "js"]

          expect(config.listen_extensions).to include "rb"
          expect(config.listen_extensions).to include "html.*"
        end
      end

      context "ui_theme" do
        it "defaults to 'indigo'" do
          expect(config.ui_theme).to eq "indigo"
        end

        it "can be changed to a valid theme" do
          config.ui_theme = "zinc"

          expect(config.ui_theme).to eq "zinc"
        end

        it "raises an exception if set to an invalid theme" do
          expect { config.ui_theme = "not_a_theme" }.to raise_error Lookbook::ConfigError
        end
      end

      context "ui_theme_overrides" do
        it "is a hash" do
          expect(config.ui_theme_overrides).to be_a Hash
        end

        it "can have an individual value changed" do
          config.ui_theme_overrides.divider = "green"

          expect(config.ui_theme_overrides.divider).to eq "green"
        end

        it "supports setting theme vars as a hash" do
          config.ui_theme_overrides = {
            divider: "red",
            toolbar_divider: "blue",
            input_border: "green"
          }

          expect(config.ui_theme_overrides.divider).to eq "red"
          expect(config.ui_theme_overrides.toolbar_divider).to eq "blue"
          expect(config.ui_theme_overrides.input_border).to eq "green"
        end
      end

      context "ui_favicon" do
        it "is enabled by default" do
          expect(config.ui_favicon).to be true
        end

        it "can be disabled" do
          config.ui_favicon = false

          expect(config.ui_favicon).to be false
        end
      end

      context "ui_favicon_light" do
        it "returns an SVG data URI" do
          expect(config.ui_favicon_light.start_with?("data:image/svg+xml")).to be true
        end

        it "cannot be set directly" do
          config.ui_favicon_light = "bar"

          expect(config.ui_favicon_light).not_to eq "bar"
        end
      end

      context "ui_favicon_dark" do
        it "returns an SVG data URI" do
          expect(config.ui_favicon_dark.start_with?("data:image/svg+xml")).to be true
        end

        it "cannot be set directly" do
          config.ui_favicon_dark = "bar"

          expect(config.ui_favicon_dark).not_to eq "bar"
        end
      end

      context "debug_menu" do
        case env
        when :development
          it "is enabled in development" do
            expect(config.debug_menu).to be true
          end
        when :production
          it "is disabled in production" do
            expect(config.debug_menu).to be false
          end
        when :test
          it "is enabled in test" do
            expect(config.debug_menu).to be true
          end
        end

        it "can be changed" do
          before_value = config.debug_menu
          config.debug_menu = !before_value

          expect(config.debug_menu).to eq !before_value
        end
      end
    end
  end
end
