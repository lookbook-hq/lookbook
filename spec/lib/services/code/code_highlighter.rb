require "rails_helper"

RSpec.describe Lookbook::CodeHighlighter do
  it "highlights ruby by default" do
    result = described_class.call("foo = :bar")

    expect(result).to include "code highlight"
    expect(result).to include "data-lang=\'ruby\'"
  end

  it "can highlight other langauges" do
    html_result = described_class.call("<div>foo</div>", :html)
    js_result = described_class.call("{foo: 'bar'}", language: :js)

    expect(html_result).to include "data-lang=\'html\'"
    expect(js_result).to include "data-lang=\'js\'"
  end
end
