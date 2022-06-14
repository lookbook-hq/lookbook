require "rails_helper"

RSpec.describe Lookbook::TabPanels::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(alpine_data: "$store.namespace.objectWithActiveTabProperty")) do |tabs|
      tabs.panel { "First section" }
      tabs.panel { "Second section" }
    end

    expect(page).to have_css("[data-component=tab-panels]")
  end

  it "includes all the expected content sections" do
    render_inline(described_class.new(alpine_data: "$store.namespace.objectWithActiveTabProperty")) do |tabs|
      tabs.panel { "First section" }
      tabs.panel { "Second section" }
      tabs.panel { "Third section" }
    end

    expect(page).to have_css("[data-component=tab-panels-panel]", count: 3)
  end
end
