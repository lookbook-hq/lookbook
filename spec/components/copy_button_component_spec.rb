require "rails_helper"

RSpec.describe Lookbook::CopyButton::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(target: "#target-id"))

    expect(page).to have_css("[data-component=copy-button]")
  end
end
