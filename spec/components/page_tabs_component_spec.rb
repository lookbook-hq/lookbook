require "rails_helper"

RSpec.describe Lookbook::PageTabs::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do |tabs|
      tabs.with_tab label: "First tab" do
        "First"
      end
      tabs.with_tab label: "Second tab" do
        "Second"
      end
    end

    expect(page).to have_css("[data-component=page-tabs]")
  end

  it "includes all the tabs" do
    render_inline(described_class.new) do |tabs|
      tabs.with_tab label: "First tab" do
        "First"
      end
      tabs.with_tab label: "Second tab" do
        "Second"
      end
      tabs.with_tab label: "Third tab" do
        "Third"
      end
    end

    expect(page).to have_css("[data-component=tabs-tab]", count: 3)
  end
end
