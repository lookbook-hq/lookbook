require "rails_helper"

RSpec.describe Lookbook::TagOptions do
  let(:json_data_path) { Rails.root.join("data/icons.json") }
  let(:json_data) { JSON.parse(File.read(json_data_path)) }
  let(:yaml_data_path) { Rails.root.join("data/icons.yml") }
  let(:yaml_data) { YAML.safe_load(File.read(yaml_data_path)) }

  before { Lookbook.config.preview_params_options_eval = true }
  after { Lookbook.config.preview_params_options_eval = false }

  context ".resolve_file_path" do
    context "with relative paths" do
      let(:json_tag_opts) { described_class.new("../dummy/data/icons.json", base_dir: Rails.root) }
      let(:yaml_tag_opts) { described_class.new("../dummy/data/icons.yml", base_dir: Rails.root) }

      it "returns a Pathname" do
        expect(json_tag_opts.resolve_file_path).to be_a Pathname
        expect(yaml_tag_opts.resolve_file_path).to be_a Pathname
      end

      it "correctly resolves a JSON file path" do
        expect(json_tag_opts.resolve_file_path.to_s).to eq json_data_path.to_s
      end

      it "correctly resolves a YAML file path" do
        expect(yaml_tag_opts.resolve_file_path.to_s).to eq yaml_data_path.to_s
      end
    end

    context "with root-relative paths" do
      let(:tag_opts) { described_class.new("data/icons.json") }

      it "returns a Pathname" do
        expect(tag_opts.resolve_file_path).to be_a Pathname
      end

      it "correctly resolves a the file path" do
        expect(tag_opts.resolve_file_path.to_s).to eq json_data_path.to_s
      end
    end
  end

  context ".evaluate" do
    context "with valid statement and scope" do
      let(:tag_opts) { described_class.new("{{ SELECT_OPTS }}", eval_scope: TagOptsContext.new) }

      it "evaluates the string in the context of the scope object" do
        expect(tag_opts.evaluate).to eq TagOptsContext::SELECT_OPTS
      end
    end

    context "with invalid statement" do
      let(:tag_opts) { described_class.new("{{ SELECT_OOOPS }}", eval_scope: TagOptsContext.new) }

      it "evaluates the string in the context of the scope object" do
        expect { tag_opts.evaluate }.to raise_error NameError
      end
    end

    context "with invalid syntax" do
      let(:tag_opts) { described_class.new("{ SELECT_OPTS }}", eval_scope: TagOptsContext.new) }

      it "returns an empty hash" do
        expect(tag_opts.evaluate).to eq({})
      end
    end
  end

  context ".resolve" do
    it "correctly identifies a json file to load" do
      tag_opts = described_class.new("data/icons.json")
      expect(tag_opts.resolve).to eq json_data
    end

    it "correctly identifies a yaml file to load" do
      tag_opts = described_class.new("data/icons.yml")
      expect(tag_opts.resolve).to eq json_data
    end

    it "correctly identifies an evaluatable string for eval'ing" do
      tag_opts = described_class.new("{{ SELECT_OPTS }}", eval_scope: TagOptsContext.new)
      expect(tag_opts.resolve).to match_array(TagOptsContext::SELECT_OPTS)
    end

    it "correctly identifies a YAML string for parsing" do
      tag_opts = described_class.new("[one, two, three]")
      expect(tag_opts.resolve).to match_array(["one", "two", "three"])
    end
  end
end

class TagOptsContext
  SELECT_OPTS = %w[one two three]
end
