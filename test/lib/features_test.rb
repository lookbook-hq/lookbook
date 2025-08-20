require "test_helper"

module Lookbook
  class FeaturesTest < ActiveSupport::TestCase
    describe "#configuration" do
      it "returns an OrderedOptions instance" do
        assert_kind_of ActiveSupport::OrderedOptions, Features.configuration
      end

      it "loads values from config file" do
        config_file_json = Rails.application.config_for(Engine.root.join("config/feature_flags.yml")).to_json
        assert_equal Features.configuration.to_json, config_file_json
      end
    end

    Features.configuration.keys.each do |feature_name|
      describe feature_name do
        it "is disabled by default" do
          assert_equal false, Features.enabled?(feature_name)
        end

        it "can be enabled/disabled via an ENV var" do
          ENV["LOOKBOOK_#{feature_name.upcase}"] = "true"

          assert_equal true, Features.enabled?(feature_name)

          ENV["LOOKBOOK_#{feature_name.upcase}"] = "false"
        end

        it "can be enabled/disabled by adding to config.enabled_beta_features array" do
          Lookbook.config.enabled_beta_features = [feature_name.to_sym]

          assert_equal true, Features.enabled?(feature_name)

          Lookbook.config.enabled_beta_features = []

          assert_equal false, Features.enabled?(feature_name)
        end

        # teardown do
        #   ENV["LOOKBOOK_#{feature_name.upcase}"] = "false"
        # end
      end
    end
  end
end
