require "rails_helper"

RSpec.describe Lookbook::FileResolver do
  it "is a DataResolver" do
    expect(described_class).to be < Lookbook::DataResolver
  end

  context "json" do
    let(:valid_file) { Rails.root.join("../fixtures/valid_data.json") }
    let(:invalid_file) { Rails.root.join("../fixtures/invalid_data.json") }
    let(:invalid_file_path) { "does/not/exist.json" }
    let(:unmatched_input) { "not a path" }

    it_behaves_like "file resolver", exception_class: JSON::ParserError
  end

  context "yaml" do
    let(:valid_file) { Rails.root.join("../fixtures/valid_data.yml") }
    let(:invalid_file) { Rails.root.join("../fixtures/invalid_data.yml") }
    let(:invalid_file_path) { "does/not/exist.yml" }
    let(:unmatched_input) { "not a path" }

    it_behaves_like "file resolver", exception_class: Psych::SyntaxError
  end
end
