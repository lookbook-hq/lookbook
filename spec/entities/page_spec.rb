require "rails_helper"

RSpec.describe Lookbook::Page do
  context "when not set in frontmatter" do
    let(:page) { Lookbook.pages.find_by_id(:no_frontmatter_test) }

    context ".label" do
      it "is generated from the file name" do
        expect(page.label).to eq "No Frontmatter"
      end
    end

    context ".title" do
      it "is generated from the file name" do
        expect(page.title).to eq "No Frontmatter"
      end
    end
  end

  context "when set in frontmatter" do
    let(:page) { Lookbook.pages.find_by_id(:frontmatter_test) }

    context ".label" do
      it "returns the expected value" do
        expect(page.label).to eq "Frontmatter Label"
      end
    end

    context ".title" do
      it "returns the expected value" do
        expect(page.title).to eq "Frontmatter Title"
      end
    end
  end
end
