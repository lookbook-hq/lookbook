require "rails_helper"

RSpec.describe Lookbook::Button::Component, type: :component do
  include ComponentsHelper

  it "renders component" do
    render_inline(described_class.new(icon: :book))

    expect(rendered_html).to have_css("[data-component=button]")
  end
end
