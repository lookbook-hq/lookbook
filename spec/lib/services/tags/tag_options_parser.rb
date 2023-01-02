require "rails_helper"

RSpec.shared_scenarios "tag option resolver" do |result_text: nil|
  it "extracts and resolves the options" do
    options, text = described_class.call(tag_text, **opts)

    expect(options).to be_a Lookbook::Store
    expect(options.foo).to eq "bar"
    expect(text).to eq result_text || tag_body
  end
end

RSpec.describe Lookbook::TagOptionsParser do
  let(:opts) { {} }
  let(:tag_body) { "some other text" }

  context "tag with YAML options" do
    let(:tag_text) { " #{tag_body} { foo: bar } " }

    it_behaves_like "tag option resolver"

    context "no body" do
      let(:tag_text) { "{ foo: bar }" }

      it_behaves_like "tag option resolver", result_text: ""
    end
  end

  context "tag with file options" do
    context "JSON file" do
      let(:file_path) { Rails.root.join("../fixtures/valid_data.json") }
      let(:tag_text) { " #{tag_body} #{file_path}" }

      it_behaves_like "tag option resolver"

      context "no body" do
        let(:tag_text) { file_path.to_s }

        it_behaves_like "tag option resolver", result_text: ""
      end
    end

    context "YAML file" do
      let(:file_path) { Rails.root.join("../fixtures/valid_data.yml") }
      let(:tag_text) { " #{tag_body} #{file_path}" }

      it_behaves_like "tag option resolver"

      context "no body" do
        let(:tag_text) { file_path.to_s }

        it_behaves_like "tag option resolver", result_text: ""
      end
    end
  end

  context "evaluated options" do
    let(:opts) {
      {
        eval_context: TagOptionsEvalContext.new
      }
    }

    context "tag with options from method" do
      let(:tag_text) { " #{tag_body} :get_data " }

      it_behaves_like "tag option resolver"

      context "no body" do
        let(:tag_text) { ":get_data" }

        it_behaves_like "tag option resolver", result_text: ""
      end
    end

    context "tag with options from eval" do
      let(:tag_text) { " #{tag_body} {{ get_data }} " }

      it_behaves_like "tag option resolver"

      context "no body" do
        let(:tag_text) { "{{ get_data }}" }

        it_behaves_like "tag option resolver", result_text: ""
      end
    end
  end

  context "no options specified" do
    let(:tag_text) { "no options here" }

    it "returns an empty store" do
      options, text = described_class.call(tag_text)

      expect(options).to be_a Lookbook::Store
      expect(options.empty?).to be true
      expect(text).to eq tag_text
    end

    it "can return a fallback" do
      options, text = described_class.call(tag_text, {
        fallback: "fallback_value"
      })

      expect(options).to eq "fallback_value"
      expect(text).to eq tag_text
    end
  end

  context "unresolvable options" do
    let(:tag_text) { "#{tag_body} {{ foo }}" }

    it "raises an exception" do
      expect { described_class.call(tag_text) }.to raise_error Lookbook::ParserError
    end

    context "fail_silently = true" do
      it "does not raise an exception" do
        expect { described_class.call(tag_text, fail_silently: true) }.not_to raise_error
      end

      it "returns the fallback after failure" do
        result = described_class.call(tag_text, fail_silently: true, fallback: "fallback_value")

        expect(result.first).to eq "fallback_value"
        expect(result.second).to eq tag_body
      end
    end
  end

  # standard:disable Lint/ConstantDefinitionInBlock
  class TagOptionsEvalContext
    def get_data
      {foo: "bar"}
    end
  end
  # standard:enable Lint/ConstantDefinitionInBlock
end
