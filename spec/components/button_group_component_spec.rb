require "rails_helper"

RSpec.describe Lookbook::ButtonGroup::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do |group|
      group.button icon: :book
    end

    expect(page).to have_css("[data-component='button-group']")
  end
end
