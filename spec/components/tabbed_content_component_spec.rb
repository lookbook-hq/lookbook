require "rails_helper"

RSpec.describe Lookbook::TabbedContent::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(alpine_data: "$store.namespace.objectWithActiveTabProperty")) do |content|
      content.section { "First section" }
      content.section { "Second section" }
    end

    expect(html).to have_css("[data-component=tabbed-content]")
  end

  it "includes all the expected content sections" do
    render_inline(described_class.new(alpine_data: "$store.namespace.objectWithActiveTabProperty")) do |content|
      content.section { "First section" }
      content.section { "Second section" }
      content.section { "Third section" }
    end

    expect(html).to have_css("[data-component=tabbed-content-section]", count: 3)
  end
end
