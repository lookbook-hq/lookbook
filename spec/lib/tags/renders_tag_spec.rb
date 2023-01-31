require "rails_helper"

RSpec.describe Lookbook::RendersTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context ".value" do
    it "returns the component class name" do
      tag = described_class.new("InlineComponent")
      expect(tag.value).to eq "InlineComponent"
    end

    it "does not raise an exception if the component doesn't exist" do
      tag = described_class.new("DoesntExistComponent")

      expect { tag.value }.not_to raise_error
    end

    it "returns nil if no component is specified" do
      tag = described_class.new

      expect(tag.value).to be nil
    end
  end
end
