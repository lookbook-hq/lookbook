require "rails_helper"

RSpec.describe Lookbook::Preview do
  context "default" do
    let(:preview) { Lookbook.previews.find_by_id(:standard) }

    context ".full_path" do
      it "returns the full absolute path to the component preview file" do
        expect(preview.full_path.to_s).to eq preview_path("standard_component_preview.rb").to_s
      end
    end

    context ".url_path" do
      it "returns the URL to the preview rendered in the inspector" do
        expect(preview.url_path).to eq lookbook_inspect_path("standard")
      end
    end

    context ".examples" do
      it "returns an array of PreviewExamples" do
        examples = preview.examples
        expect(examples).to be_a Array
        examples.each do |example|
          expect(example).to be_a Lookbook::PreviewExample
        end
      end

      it "includes all the public example methods in the class" do
        expect(preview.examples.size).to eq 3
      end
    end
  end

  context "without annotations" do
    let(:preview) { Lookbook.previews.find_by_id(:unannotated) }

    context ".id" do
      it "is generated from the class name" do
        expect(preview.id).to eq "unannotated"
      end
    end

    context ".label" do
      it "is generated from the class name" do
        expect(preview.label).to eq "Unannotated"
      end
    end

    context ".hidden?" do
      it "is false" do
        expect(preview.hidden?).to eq false
      end
    end
  end

  context "with annotations" do
    let(:preview) { Lookbook.previews.find_by_id(:annotated_test) }

    context ".id" do
      it "returns the normalised value from the @id tag" do
        expect(preview.id).to eq "annotated-test"
      end
    end

    context ".label" do
      it "returns the value from the @label tag" do
        expect(preview.label).to eq "Annotated Label"
      end
    end

    context ".hidden?" do
      it "is set by the annotation" do
        expect(preview.hidden?).to eq true
      end
    end

    context ".tags" do
      it "returns an array of Tag objects" do
        tags = preview.tags
        expect(tags).to be_a Array

        tags.each do |tag|
          expect(tag).to be_a Lookbook::Tag
        end
      end

      it "includes all the known tags when no type is specified" do
        expect(preview.tags.size).to eq 5
      end

      it "includes only the matching tags when a type is specified" do
        custom_tags = preview.tags(:custom)
        expect(custom_tags.size).to eq 2

        custom_tags.each do |tag|
          expect(tag.tag_name).to eq :custom
        end
      end

      it "does not include unknown tags" do
        expect(preview.tags.map(&:tag_name).include?(:unregistered)).to eq false
      end
    end

    context ".tag" do
      it "returns the first of all Tag object when no type is specified" do
        tag = preview.tag
        first_tag = preview.tags.first
        expect(tag).to be_a Lookbook::Tag
        expect(tag.tag_name).to eq first_tag.tag_name
        expect(tag.tag_body).to eq first_tag.tag_body
      end

      it "returns the first of the matching Tag objects when a type is specified" do
        custom_tag = preview.tag(:custom)
        first_custom_tag = preview.tags(:custom).first
        expect(custom_tag.tag_name).to eq :custom
        expect(custom_tag.tag_body).to eq first_custom_tag.tag_body
      end
    end
  end
end
