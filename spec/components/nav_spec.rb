require "rails_helper"

RSpec.describe Lookbook::Nav::Component, type: :component do
  it "renders component" do
    render_inline(described_class.new(collection: Lookbook::Collection.new))

    expect(html).to have_css("[data-component=nav]")
  end
end
