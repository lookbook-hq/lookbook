require "rails_helper"

RSpec.describe Lookbook::ParamTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context "with name" do
    let(:tag) { described_class.new("foo") }

    it "parses the name" do
      expect(tag.name).to eq "foo"
    end

    it "has no text" do
      expect(tag.text).to eq ""
    end

    context "with value type" do
      let(:tag) { described_class.new("foo [Boolean]") }

      it "parses the value type" do
        expect(tag.value_type).to eq "boolean"
      end

      context "with input" do
        let(:tag) { described_class.new("foo [Boolean] select") }

        it "parses the value type" do
          expect(tag.value_type).to eq "boolean"
        end

        it "parses the input" do
          expect(tag.input).to eq "select"
        end
      end
    end

    context "with input" do
      let(:tag) { described_class.new("foo select") }

      it "parses the input" do
        expect(tag.input).to eq "select"
      end

      context "with description" do
        let(:tag) { described_class.new("foo select \"a description\"") }

        it "parses the input" do
          expect(tag.input).to eq "select"
        end

        it "parses the description" do
          expect(tag.description).to eq "a description"
        end
      end
    end

    context "with description" do
      let(:tag) { described_class.new("foo \"a description\"") }

      it "parses the description" do
        expect(tag.description).to eq "a description"
      end
    end
  end
end
