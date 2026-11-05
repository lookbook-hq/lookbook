require "rails_helper"

RSpec.describe Lookbook::CodeHighlighter do
  it "highlights ruby by default" do
    result = described_class.call("foo = :bar")

    expect(result).to include "code highlight"
    expect(result).to include "data-lang='ruby'"
  end

  it "can highlight other langauges" do
    html_result = described_class.call("<div>foo</div>", :html)
    js_result = described_class.call("{foo: 'bar'}", language: :js)

    expect(html_result).to include "data-lang='html'"
    expect(js_result).to include "data-lang='js'"
  end

  it "decodes the entities ERB escaped in the source before highlighting it" do
    source = ERB::Util.html_escape(%(<a href="/posts?page=2&sort=asc">Alice's posts</a>))
    result = Nokogiri::HTML5.fragment(described_class.call(source, :html)).text

    expect(result).to eq %(<a href="/posts?page=2&sort=asc">Alice's posts</a>)
  end
end
