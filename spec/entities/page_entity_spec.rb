require "rails_helper"

RSpec.describe Lookbook::PageEntity do
  context "default" do
    let(:page) { Lookbook.pages.find_by_id(:subpages_child) }

    context ".path" do
      it "is generated from the page template path" do
        expect(page.path).to eq "subpages/child"
      end
    end

    context ".url_path" do
      it "returns the correct URL to the page" do
        expect(page.url_path).to eq lookbook_page_path(page.path)
      end
    end

    context ".file_path" do
      it "returns the absolute path to the page template file" do
        expect(page.file_path.to_s).to eq page_path("03_subpages/01_child.md.erb").to_s
      end

      it "is a Pathname" do
        expect(page.file_path).to be_a Pathname
      end
    end

    context ".full_path" do
      it "is a (deprecated) alias for .file_path" do
        expect(page.full_path).to eql page.file_path
      end
    end
  end

  context "without frontmatter" do
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

    context ".data" do
      it "is an empty Store instance" do
        expect(page.data).to be_a Lookbook::Store
        expect(page.data.count).to eq 0
      end
    end

    context ".content" do
      it "is the raw page template contents" do
        expect(page.content.strip).to eq "No-frontmatter test page"
      end
    end
  end

  context "with frontmatter" do
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

    context ".data" do
      it "is an Store instance of user data" do
        expect(page.data).to be_a Lookbook::Store
        expect(page.data.foo).to eq "bar"
      end
    end

    context ".content" do
      it "is the raw page template contents" do
        expect(page.content.strip).to eq "Frontmatter test page"
      end
    end
  end
end
