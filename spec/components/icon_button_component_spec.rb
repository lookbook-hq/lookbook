require "rails_helper"

RSpec.describe Lookbook::IconButton::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(icon: :book))

    expect(page).to have_css("[data-component=icon-button]")
  end

  it "displays an icon" do
    render_inline(described_class.new(icon: :book))

    expect(page).to have_css("[data-component=icon-button] [data-component=icon]")
  end
end
