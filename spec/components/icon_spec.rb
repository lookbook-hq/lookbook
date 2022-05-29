require "rails_helper"

RSpec.describe Lookbook::Icon::Component, type: :component do
  it "renders component" do
    render_inline(described_class.new(name: :book))

    expect(html).to have_css("[data-component=icon]")
  end
end
