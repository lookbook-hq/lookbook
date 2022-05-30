require "rails_helper"

RSpec.describe Lookbook::Prose::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do
      "This is the prose content"
    end

    expect(html).to have_css("[data-component=prose]")
  end

  it "outputs the content" do
    render_inline(described_class.new) do
      "This is the prose content"
    end

    expect(rendered_component).to include("This is the prose content")
  end

  it "renders markdown by default" do
    render_inline(described_class.new) do
      "This is the **prose** content"
    end

    expect(html).to have_css("strong", text: "prose")
  end
end
