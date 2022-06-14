require "rails_helper"

RSpec.describe Lookbook::Embed::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(id: "embed-1", example: lookbook_example))

    expect(page).to have_css("[data-component=embed]")
  end
end
