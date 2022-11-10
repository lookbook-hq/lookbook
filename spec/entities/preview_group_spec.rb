require "rails_helper"

RSpec.describe Lookbook::PreviewGroup do
  let(:preview) { Lookbook.previews.find_by_id(:group) }
  let(:groups) { preview.examples.select { |e| e.is_a?(Lookbook::PreviewGroup) } }

  context "default" do
    let(:group) { preview.example("named") }

    context ".type" do
      it "returns the entity type" do
        expect(group.type).to eq :group
      end
    end

    context ".examples" do
      it "returns a collection of PreviewExamples" do
        examples = group.examples
        expect(examples).to be_a Lookbook::PreviewExampleCollection
        examples.each do |example|
          expect(example).to be_a Lookbook::PreviewExample
        end
      end
    end
  end

  context "unnamed group" do
    let(:group) { groups.first }

    context ".name" do
      it "is generated from the preview" do
        expect(group.name).to eq "groups"
      end
    end

    context ".url_path" do
      it "returns the expected preview group URL" do
        expect(group.url_path).to eq lookbook_inspect_path("group/groups")
      end
    end
  end

  context "named group" do
    let(:group) { preview.example("named") }

    context ".url_path" do
      it "returns the expected preview group URL" do
        expect(group.url_path).to eq lookbook_inspect_path("group/named")
      end
    end
  end
end
