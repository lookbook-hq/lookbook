require "rails_helper"

RSpec.describe Lookbook::AttributeUtils do
  context ".dom_id" do
    it "is suitable for use as an DOM id" do
      test_strings = ["with spaces", :symbol_with_underscores, "12324245", "UPPERCASE-mix"]
      test_strings.each do |str|
        dom_id = Lookbook::AttributeUtils.dom_id(str)

        expect(dom_id).to be_a String
        expect(dom_id).to include(str.to_s.parameterize.dasherize)
        expect(dom_id).not_to match(/\s/)
        expect(dom_id).not_to match(/[A-Z]/)
        expect(dom_id).not_to match(/^\d/)
        expect(dom_id).not_to match(/_/)
      end
    end
  end
end
