require "rails_helper"

RSpec.describe Lookbook::Header::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new)

    expect(page).to have_css("[data-component=header]")
  end
end
