require "rails_helper"

RSpec.describe Lookbook::ParamFieldset::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do |fieldset|
      fieldset.field input: :text, name: "text param"
    end

    expect(html).to have_css("[data-component=param-fieldset]")
  end
end
