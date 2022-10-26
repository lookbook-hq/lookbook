require "rails_helper"

RSpec.describe Lookbook::IdTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context ".value" do
    it "returns a DOM-safe version of the provided ID" do
      tag = described_class.new("test")
      expect(tag.value).to eq "test"

      tag = described_class.new("test one")
      expect(tag.value).to eq Lookbook::AttributeUtils.entity_id("test one")
    end
  end
end
