require "rails_helper"
require "ostruct"

RSpec.describe Lookbook::SourceTag do
  let(:host_object) do
    OpenStruct.new(files: [
      [Rails.root.join("test/components/previews/nested/my_component/preview.rb"), 1]
    ])
  end

  let(:resolved_path) { Rails.root.join("test/components/previews/nested/my_component/component.js") }

  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context "file-relative source path" do
    let(:tag) { described_class.new("./component.js") }

    context ".value" do
      it "returns the resolved path" do
        expect(tag).to receive(:object).at_least(:once).and_return(host_object)
        expect(tag.value).to eq resolved_path
        expect(tag.value).to be_a Pathname
      end
    end
  end

  context "base-relative source path" do
    let(:tag) { described_class.new("nested/my_component/component.js") }

    context ".value" do
      it "returns the resolved path" do
        expect(tag).to receive(:object).at_least(:once).and_return(host_object)
        expect(tag.value).to eq resolved_path
        expect(tag.value).to be_a Pathname
      end
    end
  end
end
