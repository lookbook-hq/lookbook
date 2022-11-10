RSpec.shared_examples "unannotated entity" do |preview_id, example_name = nil|
  let(:target) do
    preview = Lookbook.previews.find_by_id(preview_id)
    example_name.nil? ? preview : preview.example(example_name)
  end

  context ".hidden?" do
    it "is false" do
      expect(target.hidden?).to eq false
    end
  end

  context ".tags" do
    it "returns an empty array" do
      tags = target.tags
      expect(tags).to be_a Array
      expect(tags.size).to eq 0
    end
  end

  context ".tag" do
    it "returns nil" do
      expect(target.tag).to eq nil
    end
  end
end
