require "rails_helper"

RSpec.describe Lookbook::Viewport::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(src: "https://example.com"))

    expect(page).to have_css("[data-component=viewport]")
  end
end
