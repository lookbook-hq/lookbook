require "test_helper"

class ConfigTest < ActiveSupport::TestCase
  describe "#current" do
    it "returns the config options" do
      assert_instance_of(ActiveSupport::OrderedOptions, Lookbook::Config.current)
    end
  end
end
