require "rails_helper"

RSpec.describe Lookbook::Code::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do
      "<p>Some code</p>"
    end

    expect(page).to have_css("[data-component=code]")
  end
end
