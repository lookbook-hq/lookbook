require "rails_helper"

RSpec.describe Lookbook::Button::Component, type: :component do
  it "renders component" do
    render_inline(described_class.new(icon: :book))

    expect(html).to have_css("[data-component=button]")
  end

  it "displays an icon" do
    render_inline(described_class.new(icon: :book))

    expect(html).to have_css("[data-component=button] [data-component=icon]")
    expect(rendered_component).to include("book")
  end
end
