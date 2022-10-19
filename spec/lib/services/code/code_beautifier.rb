require "rails_helper"

RSpec.describe Lookbook::CodeBeautifier do
  let(:html_sample) { '<button type="button" class="button button-danger">Click me</button>' }
  let(:ruby_sample) { "foo = :bar" }

  it "beautifies HTML" do
    expect(::HtmlBeautifier).to receive(:beautify) { html_sample }

    result = Lookbook::CodeBeautifier.call(html_sample)

    expect(result).to include "Click me"
  end

  it "does not beautify other languages" do
    expect(::HtmlBeautifier).not_to receive(:beautify)

    result = Lookbook::CodeBeautifier.call(ruby_sample, language: :ruby)

    expect(result).to eq ruby_sample
  end
end
