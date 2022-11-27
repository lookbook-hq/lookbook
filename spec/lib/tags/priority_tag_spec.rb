require "rails_helper"

RSpec.describe Lookbook::PriorityTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context ".value" do
    it "returns an integer based on the supplied value" do
      tag = described_class.new("1")
      expect(tag.value).to eq 1

      tag = described_class.new("123.32")
      expect(tag.value).to eq 123
    end

    it "returns the default value if the string cannot be converted into an integer" do
      tag = described_class.new("foo")
      expect(tag.value).to eq Lookbook::PriorityTag::DEFAULT_PRIORITY
    end
  end
end
