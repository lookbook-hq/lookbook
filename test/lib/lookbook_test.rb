require "test_helper"

class LookbookTest < ActiveSupport::TestCase
  describe "#version" do
    it "returns the current Lookbook version" do
      assert_equal(Gem.loaded_specs["lookbook"].version, Lookbook.version)
    end
  end

  describe "#config" do
    it "returns an ordered options instance" do
      assert_instance_of(ActiveSupport::OrderedOptions, Lookbook.config)
    end
  end

  describe "#logger" do
    it "returns an logger instance" do
      assert_instance_of(Logger, Lookbook.logger)
    end
  end
end
