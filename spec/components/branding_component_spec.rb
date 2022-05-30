require "rails_helper"

RSpec.describe Lookbook::Branding::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(text: "Lookbook"))

    expect(html).to have_css("[data-component=branding]")
  end

  it "displays the text" do
    render_inline(described_class.new(text: "Lookbook"))

    expect(html).to have_content("Lookbook")
  end
end
