require "rails_helper"

RSpec.describe Lookbook::PageTabs::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do |tabs|
      tabs.tab label: "First tab"
      tabs.tab label: "Second tab"
    end

    expect(page).to have_css("[data-component=page-tabs]")
  end

  it "includes all the tabs" do
    render_inline(described_class.new) do |tabs|
      tabs.tab label: "First tab"
      tabs.tab label: "Second tab"
      tabs.tab label: "Third tab"
    end

    expect(page).to have_css("[data-component=tabs-tab]", count: 3)
  end
end
