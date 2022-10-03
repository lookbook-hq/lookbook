require "rails_helper"

RSpec.describe Lookbook::Params do
  context ".build_param" do
    it "returns a hash of param info" do
      tag = build(:param_tag)
      param_data = Lookbook::Params.build_param(tag)
      expect(param_data).to be_a Hash
    end

    context "JSON file options" do
      let(:json_data) { JSON.parse(File.read(Rails.root.join("data/icons.json"))) }

      it "can be loaded from a JSON file with root-relative path" do
        tag = build(:param_tag, text: "select data/icons.json")
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options][:choices]).to match_array(json_data["choices"])
      end

      it "can be loaded from a JSON file relative to the code object file" do
        tag = build(:param_tag,
          text: "select ../icons.json",
          file: Rails.root.join("data/foobar/example_preview.rb"))
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options][:choices]).to match_array(json_data["choices"])
      end

      it "should return an empty hash and log a warning if the file is not found" do
        expect(Lookbook.logger).to receive(:warn).with(Lookbook::Error)
        tag = build(:param_tag, text: "select data/file_does_not_exist.json")
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options]).to eq({})
      end
    end

    context "YAML file options" do
      let(:yaml_data) { YAML.safe_load(File.read(Rails.root.join("data/icons.yml"))) }

      it "can be loaded from a YAML file with root-relative path" do
        tag = build(:param_tag, text: "select data/icons.yml")
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options][:choices]).to match_array(yaml_data["choices"])
      end

      it "can be loaded from a YAML file relative to the code object file" do
        tag = build(:param_tag,
          text: "select ../icons.yml",
          file: Rails.root.join("data/foobar/example_preview.rb"))
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options][:choices]).to match_array(yaml_data["choices"])
      end

      it "should return an empty hash and log a warning if the file is not found" do
        expect(Lookbook.logger).to receive(:warn).with(Lookbook::Error)
        tag = build(:param_tag, text: "select data/file_does_not_exist.yml")
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options]).to eq({})
      end
    end

    context "options eval" do
      it "is disabled by default" do
        expect(Lookbook.logger).to receive(:warn).with(Lookbook::Error)
        tag = build(:param_tag, text: "select {{ SELECT_OPTS }}")
        param_data = Lookbook::Params.build_param(tag)
        expect(param_data[:input_options]).to eq({})
      end

      context "when enabled" do
        before { Lookbook.config.preview_params_options_eval = true }
        after { Lookbook.config.preview_params_options_eval = false }

        context "using method reference syntax" do
          let(:tag) { build(:param_tag, text: "select :options_method") }

          it "does not log a warning" do
            expect(Lookbook.logger).not_to receive(:warn)
            Lookbook::Params.build_param(tag, eval_scope: SelectOptsContext.new)
          end

          it "is evaluated in the expected scope" do
            context = SelectOptsContext.new
            param_data = Lookbook::Params.build_param(tag, eval_scope: context)
            expect(param_data[:input_options]).to eq context.options_method
          end
        end

        context "using curly brace syntax" do
          let(:tag) { build(:param_tag, text: "select {{ SELECT_OPTS }}") }

          it "does not log a warning" do
            expect(Lookbook.logger).not_to receive(:warn)
            Lookbook::Params.build_param(tag, eval_scope: SelectOptsContext.new)
          end

          it "is evaluated in the expected scope" do
            param_data = Lookbook::Params.build_param(tag, eval_scope: SelectOptsContext.new)
            expect(param_data[:input_options]).to match_array(SelectOptsContext::SELECT_OPTS)
          end
        end
      end
    end
  end
end

class SelectOptsContext
  SELECT_OPTS = {
    choices: %w[one two three]
  }

  def options_method
    {
      choices: %w[four five six]
    }
  end
end
