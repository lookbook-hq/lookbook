require "rails_helper"

RSpec.describe Lookbook::ConfigLoader do
  it "raises an error if the config file is not found" do
    expect { described_class.call("not/found.yml") }.to raise_error Lookbook::ConfigError
  end

  it "loads and merges config for the current environment" do
    config = described_class.call("spec/fixtures/config.yml")

    expect(config.is_shared).to be true
    expect(config.is_test).to be true
    expect(config.is_development).to be nil
  end

  it "loads and merges config for the specified environment" do
    config = described_class.call("spec/fixtures/config.yml", env: :development)

    expect(config.is_shared).to be true
    expect(config.is_test).to be nil
    expect(config.is_development).to be true
  end
end
