require "rails_helper"

RSpec.describe Lookbook::Button::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(icon: :book))

    expect(page).to have_css("[data-component=button]")
  end

  it "displays an icon" do
    render_inline(described_class.new(icon: :book))

    expect(page).to have_css("[data-component=button] [data-component=icon]")
  end
end
