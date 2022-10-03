require "rails_helper"

RSpec.describe Lookbook::PreviewExample do
  context "default" do
    let(:preview) { Lookbook.previews.find_by_id(:standard) }
    let(:example) { preview.example("default") }

    context ".url_path" do
      it "returns the URL to the preview example rendered in the inspector" do
        expect(example.url_path).to eq lookbook_inspect_path("standard/default")
      end
    end

    context ".method_source" do
      it "returns the example method source code" do
        source_lines = example.method_source.split("\n")
        expect(source_lines.first.strip).to eq "render StandardComponent.new title: \"default\" do"
      end

      it "handles multi-line method definitions" do
        multi_line_def_example = preview.example("mutli_line_def_example")
        source_lines = multi_line_def_example.method_source.split("\n")
        expect(source_lines.first.strip).to eq "render StandardComponent.new title: \"multi-line\" do"
      end
    end
  end

  context "without annotations" do
    let(:preview) { Lookbook.previews.find_by_id(:unannotated) }
    let(:example) { preview.example("default") }

    context ".id" do
      it "is generated from the class and method name" do
        expect(example.id).to eq "unannotated-default"
      end
    end

    context ".label" do
      it "is generated from the method name" do
        expect(example.label).to eq "Default"
      end
    end

    context ".hidden?" do
      it "is false" do
        expect(example.hidden?).to eq false
      end
    end
  end

  context "with annotations" do
    let(:preview) { Lookbook.previews.find_by_id(:annotated_test) }
    let(:example) { preview.example("default") }

    context ".id" do
      it "returns the normalised value from the @id tag" do
        expect(example.id).to eq "annotated-default"
      end
    end

    context ".label" do
      it "returns the value from the @label tag" do
        expect(example.label).to eq "Annotated Example"
      end
    end

    context ".hidden?" do
      it "is set by the annotation" do
        expect(example.hidden?).to eq true
      end
    end

    context ".tags" do
      it "returns an array of Tag objects" do
        tags = example.tags
        expect(tags).to be_a Array

        tags.each do |tag|
          expect(tag).to be_a Lookbook::Tag
        end
      end

      it "includes all the known tags when no type is specified" do
        expect(example.tags.size).to eq 5
      end

      it "includes only the matching tags when a type is specified" do
        custom_tags = example.tags(:custom)
        expect(custom_tags.size).to eq 2

        custom_tags.each do |tag|
          expect(tag.tag_name).to eq :custom
        end
      end

      it "does not include unknown tags" do
        expect(example.tags.map(&:tag_name).include?(:unregistered)).to eq false
      end
    end

    context ".tag" do
      it "returns the first of all Tag object when no type is specified" do
        tag = example.tag
        first_tag = example.tags.first
        expect(tag).to be_a Lookbook::Tag
        expect(tag.tag_name).to eq first_tag.tag_name
        expect(tag.tag_body).to eq first_tag.tag_body
      end

      it "returns the first of the matching Tag objects when a type is specified" do
        custom_tag = example.tag(:custom)
        first_custom_tag = example.tags(:custom).first
        expect(custom_tag.tag_name).to eq :custom
        expect(custom_tag.tag_body).to eq first_custom_tag.tag_body
      end
    end
  end
end
