require "rails_helper"

RSpec.describe Lookbook::StylesExtractor do
  let(:style_block) do
    <<~TPL.strip_heredoc
      <style>
        .button {
          background-color: red;
        }
      </style>
    TPL
  end

  let(:template) do
    <<~TPL.strip_heredoc
      #{style_block}

      <div>Some HTML content</div>
    TPL
  end

  let(:multiple_style_blocks_template) do
    <<~TPL.strip_heredoc
      #{style_block}

      <div>Some HTML content</div>

      #{style_block.sub("red", "green")}
    TPL
  end

  it "extracts and parses styles from a template" do
    styles, content = described_class.call(template)

    expect(styles).to be_a Array
    expect(styles.size).to be 1
    expect(styles).to include ".button { background-color: red; }"

    expect(content).to eq "<div>Some HTML content</div>"
  end

  it "collates styles from all style tags in the template" do
    styles, content = described_class.call(multiple_style_blocks_template)

    expect(styles).to be_a Array
    expect(styles.size).to be 2
    expect(styles).to include ".button { background-color: red; }"
    expect(styles).to include ".button { background-color: green; }"

    expect(content).to eq "<div>Some HTML content</div>"
  end

  it "returns an empty array if no styles are present" do
    styles, content = described_class.call("<div>No styles here</div>")

    expect(styles).to eq([])
    expect(content).to eq "<div>No styles here</div>"
  end

  it "returns an empty string if no content is present" do
    styles, content = described_class.call(style_block)

    expect(styles).to be_a Array
    expect(styles.size).to be 1
    expect(styles).to include ".button { background-color: red; }"

    expect(content).to eq ""
  end
end
