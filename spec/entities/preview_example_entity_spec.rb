require "rails_helper"

RSpec.describe Lookbook::PreviewExampleEntity do
  context "default" do
    let(:preview) { Lookbook::Engine.previews.find_by_id(:standard) }
    let(:example) { preview.example("default") }

    context ".url_path" do
      it "returns the URL to the preview example rendered in the inspector" do
        expect(example.url_path).to eq lookbook_inspect_path("standard/default")
      end

      it "is a String" do
        expect(example.url_path).to be_a String
      end
    end

    context ".source" do
      it "returns the example method source code" do
        source_lines = example.source.split("\n")
        expect(source_lines.first.strip).to eq "render StandardComponent.new title: \"default\" do"
      end

      it "handles multi-line method definitions" do
        multi_line_def_example = preview.example("mutli_line_def_example")
        source_lines = multi_line_def_example.source.split("\n")
        expect(source_lines.first.strip).to eq "render StandardComponent.new title: \"multi-line\" do"
      end
    end

    context ".type" do
      it "returns the entity type" do
        expect(example.type).to eq :example
      end
    end
  end

  context "without annotations" do
    let(:preview) { Lookbook::Engine.previews.find_by_id(:unannotated) }
    let(:example) { preview.example("default") }

    context ".id" do
      it "is generated from the class and method name" do
        expect(example.id).to eq "unannotated-default"
      end

      it "is a String" do
        expect(example.label).to be_a String
      end
    end

    context ".label" do
      it "is generated from the method name" do
        expect(example.label).to eq "Default"
      end

      it "is a String" do
        expect(example.label).to be_a String
      end
    end

    context ".path" do
      let(:preview) { Lookbook::Engine.previews.find_by_id(:nested_standard) }
      let(:example) { preview.example("default") }

      it "is generated from the preview class file path and the example name" do
        expect(example.path).to eq "nested/standard/default"
      end

      it "is a String" do
        expect(example.path).to be_a String
      end
    end

    context ".hidden?" do
      it "is false" do
        expect(example.hidden?).to eq false
      end
    end

    context "with unguessable component" do
      let(:preview) { Lookbook::Engine.previews.find_by_id(:unannotated) }
      let(:example) { preview.example("default") }

      context ".components" do
        it "returns an empty collection" do
          components = example.components

          expect(components).to be_a Lookbook::ComponentCollection
          expect(components).to be_empty
        end
      end

      context ".component" do
        it "returns nil" do
          component = example.component

          expect(component).to be_nil
        end
      end
    end

    context "with guessable components" do
      let(:preview) { Lookbook::Engine.previews.find_by_id(:inline) }
      let(:example) { preview.example("default") }

      context ".components" do
        it "returns a collection containing the guessed component class" do
          components = example.components

          expect(components).to be_a Lookbook::ComponentCollection
          expect(components.size).to eq 1
          expect(components.first).to be_a Lookbook::ComponentEntity
        end
      end

      context ".component" do
        it "returns the first guessed component" do
          component = example.component

          expect(component).to eql example.components.first
        end
      end
    end

    it_behaves_like "unannotated entity", :unannotated, "default"
  end

  context "with annotations" do
    let(:preview) { Lookbook::Engine.previews.find_by_id(:annotated_test) }
    let(:example) { preview.example("default") }

    context ".id" do
      it "returns the normalised value from the @id tag" do
        expect(example.id).to eq "annotated-default"
      end

      it "is a String" do
        expect(example.id).to be_a String
      end
    end

    context ".label" do
      it "returns the value from the @label tag" do
        expect(example.label).to eq "Annotated Example"
      end

      it "is a String" do
        expect(example.id).to be_a String
      end
    end

    context ".path" do
      it "uses the logical path" do
        expect(example.path).to eq "foo/bar/annotated/default"
      end

      it "is a String" do
        expect(example.path).to be_a String
      end
    end

    context ".url_path" do
      it "uses the logical path" do
        expect(example.url_path).to eq lookbook_inspect_path("foo/bar/annotated/default")
      end

      it "is a String" do
        expect(example.path).to be_a String
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
          expect(tag).to be_a Lookbook::YardTag
        end
      end

      it "includes all the known tags when no type is specified" do
        expect(example.tags.size).to eq example.send(:code_object).tags.size
      end

      it "includes only the matching tags when a type is specified" do
        custom_tags = example.tags(:customtag)
        expect(custom_tags.size).to eq 2

        custom_tags.each do |tag|
          expect(tag.tag_name).to eq "customtag"
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
        expect(tag).to be_a Lookbook::YardTag
        expect(tag.tag_name).to eq first_tag.tag_name
        expect(tag.tag_body).to eq first_tag.tag_body
      end

      it "returns the first of the matching Tag objects when a type is specified" do
        custom_tag = example.tag(:customtag)
        first_custom_tag = example.tags(:customtag).first
        expect(custom_tag.tag_name).to eq "customtag"
        expect(custom_tag.tag_body).to eq first_custom_tag.tag_body
      end
    end

    context ".components" do
      it "returns an collection of components" do
        components = example.components

        expect(components).to be_a Lookbook::ComponentCollection
        components.each do |component|
          expect(component).to be_a Lookbook::ComponentEntity
        end
      end

      it "does not include unknown components" do
        components = example.components

        expect(components.size).to eq 2
      end
    end

    context ".component" do
      it "returns the first component" do
        component = example.component

        expect(component).to eql example.components.first
      end
    end
  end
end
