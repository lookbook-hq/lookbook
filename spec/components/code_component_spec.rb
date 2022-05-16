require "rails_helper"

RSpec.describe Lookbook::Code::Component, type: :component do
  it "renders component" do
    render_inline(described_class.new) do
      "<p>Some code</p>"
    end

    expect(html).to have_css("[data-component=code]")
  end
end
