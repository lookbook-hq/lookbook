require "rails_helper"

RSpec.describe Lookbook::Filter::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(store: "$store.workbench.filter"))

    expect(html).to have_css("[data-component=filter]")
  end
end
