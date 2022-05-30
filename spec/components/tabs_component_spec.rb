require "rails_helper"

RSpec.describe Lookbook::Tabs::Component, type: :component do
  let(:alpine_data) { "$store.namespace.objectWithActiveTabProperty" }

  it "renders the component" do
    render_inline(described_class.new(alpine_data: alpine_data)) do |tabs|
      tabs.tab label: "First tab"
      tabs.tab label: "Second tab"
    end

    expect(html).to have_css("[data-component=tabs]")
  end

  it "includes all the tabs" do
    render_inline(described_class.new(alpine_data: alpine_data)) do |tabs|
      tabs.tab label: "First tab"
      tabs.tab label: "Second tab"
      tabs.tab label: "Third tab"
    end

    expect(html).to have_css("[data-component=tabs-tab]", count: 3)
  end
end
