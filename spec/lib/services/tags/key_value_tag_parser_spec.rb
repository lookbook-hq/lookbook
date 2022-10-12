require "rails_helper"

RSpec.describe Lookbook::KeyValueTagParser do
  it "parses tag text into key and value parts" do
    expect(described_class.call("the_key the_value")).to eq ["the_key", "the_value"]
  end

  it "raises an exception if it cannot extract a key/value pair" do
    expect { described_class.call("foo") }.to raise_error Lookbook::ParserError
  end

  context "value resolving" do
    it "parses the value as YAML" do
      expect(described_class.call("the_key true").last).to be true
      expect(described_class.call("the_key ~").last).to be nil
      expect(described_class.call("the_key [one, two]").last).to eq ["one", "two"]
      expect(described_class.call("the_key text with spaces").last).to eq "text with spaces"
      expect(described_class.call("the_key \"quoted text with spaces\"").last).to eq "quoted text with spaces"
    end

    it "raises an exception if invalid YAML is present in the value" do
      expect { described_class.call("foo [#some_invalid_yaml") }.to raise_error Lookbook::ParserError
    end
  end
end
