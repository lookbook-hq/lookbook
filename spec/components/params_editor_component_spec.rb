require "rails_helper"

RSpec.describe Lookbook::ParamsEditor::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new) do |editor|
      editor.field input: :text, name: "text param"
    end

    expect(html).to have_css("[data-component=params-editor]")
  end
end
