require "rails_helper"

RSpec.describe Lookbook::ParamField::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(input: :text, name: "text param"))

    expect(html).to have_css("[data-component=param-field]")
  end
end
