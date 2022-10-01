require "rails_helper"

RSpec.describe "inspector", type: :request do
  context "example with params" do
    before(:context) do
      get lookbook_inspect_path("params/all_params")
    end

    it "renders all expected param inputs" do
      ["text", "email", "number", "tel", "url", "date", "datetime-local"].each do |type|
        expect(html).to have_css("#inspector-panel-params input[type=#{type}][name=#{type.tr("-", "_")}]")
      end

      expect(html).to have_css("#inspector-panel-params select[name=select]")
      expect(html).to have_css("#inspector-panel-params input[type=color][name=color]")
      expect(html).to have_css("#inspector-panel-params input[type=range][name=range]")
      expect(html).to have_css("#inspector-panel-params textarea[name=textarea]")
    end
  end
end
