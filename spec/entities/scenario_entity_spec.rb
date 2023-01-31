require "rails_helper"

RSpec.describe Lookbook::ScenarioEntity do
  context "default" do
    let(:preview) { Lookbook::Engine.previews.find_by_id(:standard) }
    let(:scenario) { preview.scenario("default") }

    context ".url_path" do
      it "returns the URL to the preview scenario rendered in the inspector" do
        expect(scenario.url_path).to eq lookbook_inspect_path("standard/default")
      end

      it "is a String" do
        expect(scenario.url_path).to be_a String
      end
    end

    context ".source" do
      it "returns the scenario method source code" do
        source_lines = scenario.source.split("\n")
        expect(source_lines.first.strip).to eq "render StandardComponent.new title: \"default\" do"
      end

      it "handles multi-line method definitions" do
        multi_line_def_scenario = preview.scenario("mutli_line_def_scenario")
        source_lines = multi_line_def_scenario.source.split("\n")
        expect(source_lines.first.strip).to eq "render StandardComponent.new title: \"multi-line\" do"
      end
    end

    context ".type" do
      it "returns the entity type" do
        expect(scenario.type).to eq :scenario
      end
    end
  end

  context "without annotations" do
    let(:preview) { Lookbook::Engine.previews.find_by_id(:unannotated) }
    let(:scenario) { preview.scenario("default") }

    context ".id" do
      it "is generated from the class and method name" do
        expect(scenario.id).to eq "unannotated-default"
      end

      it "is a String" do
        expect(scenario.label).to be_a String
      end
    end

    context ".label" do
      it "is generated from the method name" do
        expect(scenario.label).to eq "Default"
      end

      it "is a String" do
        expect(scenario.label).to be_a String
      end
    end

    context ".lookup_path" do
      let(:preview) { Lookbook::Engine.previews.find_by_id(:nested_standard) }
      let(:scenario) { preview.scenario("default") }

      it "is generated from the preview class file path and the scenario name" do
        expect(scenario.lookup_path).to eq "nested/standard/default"
      end

      it "is a String" do
        expect(scenario.lookup_path).to be_a String
      end
    end

    context ".hidden?" do
      it "is false" do
        expect(scenario.hidden?).to eq false
      end
    end

    context "with unguessable component" do
      let(:preview) { Lookbook::Engine.previews.find_by_id(:unannotated) }
      let(:scenario) { preview.scenario("default") }

      context ".components" do
        it "returns an empty collection" do
          components = scenario.components

          expect(components).to be_a Lookbook::RenderTargetCollection
          expect(components).to be_empty
        end
      end

      context ".component" do
        it "returns nil" do
          component = scenario.component

          expect(component).to be_nil
        end
      end
    end

    context "with guessable components" do
      let(:preview) { Lookbook::Engine.previews.find_by_id(:inline) }
      let(:scenario) { preview.scenario("default") }

      context ".components" do
        it "returns a collection containing the guessed component class" do
          components = scenario.components

          expect(components).to be_a Lookbook::RenderTargetCollection
          expect(components.size).to eq 1
          expect(components.first).to be_a Lookbook::RenderableEntity
        end
      end

      context ".component" do
        it "returns the first guessed component" do
          component = scenario.component

          expect(component).to eql scenario.components.first
        end
      end
    end

    it_behaves_like "unannotated entity", :unannotated, "default"
  end

  context "with annotations" do
    let(:preview) { Lookbook::Engine.previews.find_by_id(:annotated_test) }
    let(:scenario) { preview.scenario("default") }

    context ".id" do
      it "returns the normalised value from the @id tag" do
        expect(scenario.id).to eq "annotated-default"
      end

      it "is a String" do
        expect(scenario.id).to be_a String
      end
    end

    context ".label" do
      it "returns the value from the @label tag" do
        expect(scenario.label).to eq "Annotated Example"
      end

      it "is a String" do
        expect(scenario.id).to be_a String
      end
    end

    context ".lookup_path" do
      it "uses the logical path" do
        expect(scenario.lookup_path).to eq "foo/bar/annotated/default"
      end

      it "is a String" do
        expect(scenario.lookup_path).to be_a String
      end
    end

    context ".url_path" do
      it "uses the logical path" do
        expect(scenario.url_path).to eq lookbook_inspect_path("foo/bar/annotated/default")
      end

      it "is a String" do
        expect(scenario.lookup_path).to be_a String
      end
    end

    context ".hidden?" do
      it "is set by the annotation" do
        expect(scenario.hidden?).to eq true
      end
    end

    context ".tags" do
      it "returns an array of Tag objects" do
        tags = scenario.tags
        expect(tags).to be_a Array

        tags.each do |tag|
          expect(tag).to be_a Lookbook::YardTag
        end
      end

      it "includes all the known tags when no type is specified" do
        expect(scenario.tags.size).to eq scenario.send(:code_object).tags.size
      end

      it "includes only the matching tags when a type is specified" do
        custom_tags = scenario.tags(:customtag)
        expect(custom_tags.size).to eq 2

        custom_tags.each do |tag|
          expect(tag.tag_name).to eq "customtag"
        end
      end

      it "does not include unknown tags" do
        expect(scenario.tags.map(&:tag_name).include?(:unregistered)).to eq false
      end
    end

    context ".tag" do
      it "returns the first of all Tag object when no type is specified" do
        tag = scenario.tag
        first_tag = scenario.tags.first
        expect(tag).to be_a Lookbook::YardTag
        expect(tag.tag_name).to eq first_tag.tag_name
        expect(tag.tag_body).to eq first_tag.tag_body
      end

      it "returns the first of the matching Tag objects when a type is specified" do
        custom_tag = scenario.tag(:customtag)
        first_custom_tag = scenario.tags(:customtag).first
        expect(custom_tag.tag_name).to eq "customtag"
        expect(custom_tag.tag_body).to eq first_custom_tag.tag_body
      end
    end

    context ".components" do
      it "returns an collection of components" do
        components = scenario.components

        expect(components).to be_a Lookbook::RenderTargetCollection
        components.each do |component|
          expect(component).to be_a Lookbook::RenderableEntity
        end
      end

      it "does not include unknown components" do
        components = scenario.components

        expect(components.size).to eq 2
      end
    end

    context ".component" do
      it "returns the first component" do
        component = scenario.component

        expect(component).to eql scenario.components.first
      end
    end
  end
end
