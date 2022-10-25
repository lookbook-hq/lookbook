require "rails_helper"

RSpec.describe Lookbook::LabelTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context ".text" do
    let(:tag) { described_class.new("the label") }

    it "returns the label text" do
      expect(tag.text).to eql "the label"
    end
  end

  context ".value" do
    let(:tag) { described_class.new("the label") }

    it "is an alias for .text" do
      expect(tag.value).to eql tag.text
    end
  end
end
