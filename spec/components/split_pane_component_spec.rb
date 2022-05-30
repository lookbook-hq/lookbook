require "rails_helper"

RSpec.describe Lookbook::SplitLayout::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(alpine_data: "$store.namespace.layoutStoreObject")) do |layout|
      layout.pane { "First pane" }
      layout.pane { "Second pane" }
    end

    expect(html).to have_css("[data-component=split-layout]")
  end
end
