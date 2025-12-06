require "lookbook_test"

module Lookbook
  class FeatureFlagsTest < LookbookTest
    describe "#configuration" do
      test "it returns an OrderedOptions instance" do
        assert_kind_of ActiveSupport::OrderedOptions, Lookbook::Features.configuration
      end

      test "it loads values from config file" do
        config_file_json = Rails.application.config_for(Lookbook::Engine.root.join("config/feature_flags.yml")).to_json
        assert_equal Lookbook::Features.configuration.to_json, config_file_json
      end
    end

    describe "unknown feature" do
      test "is always disabled" do
        assert_equal false, Lookbook::Features.enabled?(:not_a_real_feature)
      end
    end

    Lookbook::Features.configuration.keys.each do |feature_name|
      describe feature_name do
        test "it is disabled by default" do
          assert_equal false, Lookbook::Features.enabled?(feature_name)
        end

        test "it can be enabled/disabled via an ENV var" do
          ENV["LOOKBOOK_#{feature_name.upcase}"] = "true"

          assert_equal true, Lookbook::Features.enabled?(feature_name)

          ENV["LOOKBOOK_#{feature_name.upcase}"] = "false"
        end

        test "if can be enabled/disabled by adding to config.experimental_features array" do
          Lookbook.config.experimental_features = [feature_name.to_sym]

          assert_equal true, Lookbook::Features.enabled?(feature_name)

          Lookbook.config.experimental_features = []

          assert_equal false, Lookbook::Features.enabled?(feature_name)
        end
      end
    end
  end
end
