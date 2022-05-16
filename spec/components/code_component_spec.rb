require "rails_helper"

RSpec.describe Lookbook::Code::Component, type: :component do
  include ComponentsHelper

  it "renders component" do
    render_inline(described_class.new) do
      "<p>Some code</p>"
    end

    expect(rendered_html).to have_css("[data-component=code]")
  end
end
