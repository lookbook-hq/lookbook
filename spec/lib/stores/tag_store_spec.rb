require "rails_helper"

RSpec.describe Lookbook::TagStore do
  context "instance" do
    let(:config) { Lookbook::TagStore.new }

    before do
      config = Lookbook::TagStore.new # standard:disable Lint/UselessAssignment
    end

    context ".add_tag" do
      it "adds the tag if it doesn't exist" do
        config.add_tag(:tag_name)
        tag = config.get_tag(:tag_name)

        expect(tag).not_to be nil
        expect(tag.label).to eq "Tag Name"
        expect(tag.options).to be_a Hash
      end

      it "throws an error if the tag already exists" do
        config.add_tag(:tag_name)

        expect { config.add_tag(:tag_name) }.to raise_error Lookbook::ConfigError
      end
    end
  end
end
