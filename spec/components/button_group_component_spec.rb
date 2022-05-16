require "rails_helper"

RSpec.describe Lookbook::ButtonGroup::Component, type: :component do
  include ComponentsHelper

  it "renders component" do
    render_inline(described_class.new) do |group|
      group.button icon: :book
    end

    expect(rendered_html).to have_css("[data-component='button-group']")
  end
end
