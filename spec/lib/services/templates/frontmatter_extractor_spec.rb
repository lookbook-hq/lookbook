require "rails_helper"

RSpec.describe Lookbook::FrontmatterExtractor do
  let(:frontmatter_block) do
    <<~TPL.strip_heredoc
      ---
      key: value
      key2: value2
      ---
    TPL
  end

  let(:template) do
    <<~TPL.strip_heredoc
      #{frontmatter_block}

      this is the rest of the content
    TPL
  end

  it "extracts and parses front matter from a template" do
    frontmatter, content = described_class.call(template)

    expect(frontmatter[:key]).to eq "value"
    expect(frontmatter[:key2]).to eq "value2"

    expect(content).to eq "this is the rest of the content"
  end

  it "returns an empty hash if no frontmatter is present" do
    frontmatter, content = described_class.call("no front matter here")

    expect(frontmatter).to eq({})
    expect(content).to eq "no front matter here"
  end

  it "returns an empty string if no content is present" do
    frontmatter, content = described_class.call(frontmatter_block)

    expect(frontmatter[:key]).to eq "value"
    expect(frontmatter[:key2]).to eq "value2"
    expect(content).to eq ""
  end
end
