require "rails_helper"

RSpec.describe Lookbook::Preview do
  context "default" do
    let(:preview) { Lookbook.previews.find_by_id(:standard) }

    context ".file_path" do
      it "returns the absolute path to the component preview file" do
        expect(preview.file_path.to_s).to eq preview_path("standard_component_preview.rb").to_s
      end

      it "is a Pathname" do
        expect(preview.file_path).to be_a Pathname
      end
    end

    context ".full_path" do
      it "is a (deprecated) alias for .file_path" do
        expect(preview.full_path).to eql preview.file_path
      end
    end

    context ".relative_file_path" do
      it "returns the preview-directory relative path to the component preview file" do
        expect(preview.relative_file_path.to_s).to eq "standard_component_preview.rb"
      end

      it "is a Pathname" do
        expect(preview.file_path).to be_a Pathname
      end
    end

    context ".file_name" do
      it "returns the name of the component preview file" do
        expect(preview.file_name).to eq "standard_component_preview.rb"
      end

      it "supports removing the file extension" do
        expect(preview.file_name(true)).to eq "standard_component_preview"
      end
    end

    context ".file_name_base" do
      it "returns the unique part of the file name" do
        expect(preview.file_name_base).to eq "standard"
      end
    end

    context ".url_path" do
      it "returns the URL to the preview rendered in the inspector" do
        expect(preview.url_path).to eq lookbook_inspect_path("standard")
      end

      it "is a String" do
        expect(preview.url_path).to be_a String
      end
    end

    context ".examples" do
      it "returns an collection of PreviewExamples" do
        examples = preview.examples
        expect(examples).to be_a Lookbook::PreviewExampleCollection
        examples.each do |example|
          expect(example).to be_a Lookbook::PreviewExample
        end
      end

      it "includes all the public example methods in the preview class" do
        expect(preview.examples.size).to eq preview.preview_class.public_instance_methods(false).size
      end
    end

    context ".type" do
      it "returns the entity type" do
        expect(preview.type).to eq :preview
      end
    end
  end

  context "without annotations" do
    let(:preview) { Lookbook.previews.find_by_id(:unannotated) }

    context ".id" do
      it "is generated from the class name" do
        expect(preview.id).to eq "unannotated"
      end

      it "is a String" do
        expect(preview.id).to be_a String
      end
    end

    context ".label" do
      it "is generated from the class name" do
        expect(preview.label).to eq "Unannotated"
      end

      it "is a String" do
        expect(preview.label).to be_a String
      end
    end

    context ".path" do
      let(:preview) { Lookbook.previews.find_by_id(:nested_standard) }

      it "is generated from the preview class file path" do
        expect(preview.path).to eq "nested/standard"
      end

      it "is a String" do
        expect(preview.path).to be_a String
      end
    end

    context "with unguessable component" do
      let(:preview) { Lookbook.previews.find_by_id(:unannotated) }

      context ".components" do
        it "returns an empty collection" do
          components = preview.components

          expect(components).to be_a Lookbook::ComponentCollection
          expect(components).to be_empty
        end
      end

      context ".component" do
        it "returns nil" do
          component = preview.component

          expect(component).to be_nil
        end
      end
    end

    context "with guessable components" do
      let(:preview) { Lookbook.previews.find_by_id(:inline) }

      context ".components" do
        it "returns an collection containing the guessed component class" do
          components = preview.components

          expect(components).to be_a Lookbook::ComponentCollection
          expect(components.size).to eq 1
          expect(components.first).to be_a Lookbook::Component
        end
      end

      context ".component" do
        it "returns the first guessed component" do
          component = preview.component

          expect(component).to eql preview.components.first
        end
      end
    end

    it_behaves_like "unannotated entity", :unannotated
  end

  context "with annotations" do
    let(:preview) { Lookbook.previews.find_by_id(:annotated_test) }

    context ".id" do
      it "returns the normalised value from the @id tag" do
        expect(preview.id).to eq "annotated-test"
      end

      it "is a String" do
        expect(preview.id).to be_a String
      end
    end

    context ".label" do
      it "returns the value from the @label tag" do
        expect(preview.label).to eq "Annotated Label"
      end

      it "is a String" do
        expect(preview.label).to be_a String
      end
    end

    context ".path" do
      it "uses the logical path" do
        expect(preview.path).to eq "foo/bar/annotated"
      end

      it "is a String" do
        expect(preview.path).to be_a String
      end
    end

    context ".url_path" do
      it "uses the logical path" do
        expect(preview.url_path).to eq lookbook_inspect_path("foo/bar/annotated")
      end

      it "is a String" do
        expect(preview.path).to be_a String
      end
    end

    context "hidden" do
      let(:preview) { Lookbook.previews.find_by_id(:hidden) }

      context ".hidden?" do
        it "is set by the annotation" do
          expect(preview.hidden?).to eq true
        end
      end
    end

    context ".tags" do
      it "returns an array of Tag objects" do
        tags = preview.tags
        expect(tags).to be_a Array

        tags.each do |tag|
          expect(tag).to be_a Lookbook::YardTag
        end
      end

      it "includes all the known tags when no type is specified" do
        expect(preview.tags.size).to eq preview.send(:code_object).tags.size
      end

      it "includes only the matching tags when a type is specified" do
        custom_tags = preview.tags(:customtag)
        expect(custom_tags.size).to eq 2

        custom_tags.each do |tag|
          expect(tag.tag_name).to eq "customtag"
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
        expect(tag).to be_a Lookbook::YardTag
        expect(tag.tag_name).to eq first_tag.tag_name
        expect(tag.tag_body).to eq first_tag.tag_body
      end

      it "returns the first of the matching Tag objects when a type is specified" do
        custom_tag = preview.tag(:customtag)
        first_custom_tag = preview.tags(:customtag).first
        expect(custom_tag.tag_name).to eq "customtag"
        expect(custom_tag.tag_body).to eq first_custom_tag.tag_body
      end
    end

    context ".components" do
      it "returns an collection of components" do
        components = preview.components

        expect(components).to be_a Lookbook::ComponentCollection
        components.each do |component|
          expect(component).to be_a Lookbook::Component
        end
      end

      it "does not include unknown components" do
        components = preview.components

        expect(components.size).to eq 2
      end
    end

    context ".component" do
      it "returns the first component" do
        component = preview.component

        expect(component).to eql preview.components.first
      end
    end
  end

  context "with alternative preview naming conventions" do
    context "<directory>/<component_name>/preview.rb" do
      let(:preview) { Lookbook.previews.find_by_id(:alt_name_preview) }

      it "has the expected name" do
        expect(preview.name).to eq "my_component"
      end

      it "has the expected path" do
        expect(preview.path).to eq "nested/my_component"
      end
    end

    context "<directory>/<component_name>/component_preview.rb" do
      let(:preview) { Lookbook.previews.find_by_id(:alt_name_component_preview) }

      it "has the expected name" do
        expect(preview.name).to eq "my_other_component"
      end

      it "has the expected path" do
        expect(preview.path).to eq "nested/my_other_component"
      end
    end
  end
end
