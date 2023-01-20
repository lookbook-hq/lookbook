require "rails_helper"

RSpec.describe Lookbook::SplitLayout::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(alpine_data: "$store.namespace.layoutStoreObject")) do |layout|
      layout.with_pane { "First pane" }
      layout.with_pane { "Second pane" }
    end

    expect(page).to have_css("[data-component=split-layout]")
  end
end
