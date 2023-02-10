require "rails_helper"

RSpec.describe Lookbook::ScenarioGroupEntity do
  let(:preview) { Lookbook::Engine.previews.find_by_id(:group) }
  let(:groups) { preview.scenarios.select { |e| e.is_a?(described_class) } }

  context "default" do
    let(:group) { preview.scenario("named") }

    context ".type" do
      it "returns the entity type" do
        expect(group.type).to eq :group
      end
    end

    context ".scenarios" do
      it "returns a collection of Scenarios" do
        scenarios = group.scenarios
        expect(scenarios).to be_a Lookbook::ScenarioCollection
        scenarios.each do |scenario|
          expect(scenario).to be_a Lookbook::ScenarioEntity
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
      it "returns the expected preview group inspector URL path" do
        expect(group.url_path).to eq lookbook_inspect_path("group/groups")
      end
    end

    context ".preview_path" do
      it "returns the expected preview group preview URL path" do
        expect(group.preview_path).to eq lookbook_preview_path("group/groups")
      end
    end
  end

  context "named group" do
    let(:group) { preview.scenario("named") }

    context ".url_path" do
      it "returns the expected preview group inspector URL path" do
        expect(group.url_path).to eq lookbook_inspect_path("group/named")
      end
    end

    context ".preview_path" do
      it "returns the expected preview group preview URL path" do
        expect(group.preview_path).to eq lookbook_preview_path("group/named")
      end
    end
  end
end
