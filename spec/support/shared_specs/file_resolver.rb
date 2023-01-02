RSpec.shared_scenarios "file resolver" do |exception_class: Lookbook::ParserError|
  context "unmatched input" do
    it "raises an exception" do
      expect { described_class.call(unmatched_input) }.to raise_error Lookbook::ParserError
    end
  end

  context "valid file path" do
    it "loads and parses the data" do
      result = described_class.call(valid_file)
      expect(result).to be_a Hash
      expect(result[:foo]).to eq "bar"
    end

    context "invalid data" do
      it "raises an exception" do
        expect { described_class.call(invalid_file) }.to raise_error exception_class
      end

      context "fail_silently = true" do
        it "does not raise an exception" do
          expect { described_class.call(invalid_file, fail_silently: true) }.not_to raise_error
        end

        it "returns the fallback after failure" do
          result = described_class.call(invalid_file, fail_silently: true, fallback: "fallback_value")
          expect(result).to eq "fallback_value"
        end
      end
    end
  end

  context "invalid file path" do
    it "raises an exception" do
      expect { described_class.call(invalid_file_path) }.to raise_error Lookbook::ParserError
    end

    context "fail_silently = true" do
      it "does not raise an exception" do
        expect { described_class.call(invalid_file_path, fail_silently: true) }.not_to raise_error
      end

      it "returns the fallback after failure" do
        result = described_class.call(invalid_file_path, fail_silently: true, fallback: "fallback_value")
        expect(result).to eq "fallback_value"
      end
    end
  end
end
