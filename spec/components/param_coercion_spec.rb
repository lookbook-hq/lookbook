require "rails_helper"

RSpec.describe "preview param coercion via render_preview", type: :component do
  it "coerces a symbol param" do
    result = render_preview(:coerce_symbol, from: ParamsComponentPreview, params: {my_param: "bar"})
    expect(result.text).to include("my_param=bar class=Symbol")
  end

  it "coerces mixed param types" do
    result = render_preview(:coerce_mixed, from: ParamsComponentPreview,
      params: {sym: "bar", flag: "true", num: "3"})
    expect(result.text).to include("sym=Symbol")
    expect(result.text).to include("flag=TrueClass")
    expect(result.text).to include("num=Integer")
  end

  it "coerces params for Lookbook::Preview subclasses" do
    # render_preview (ViewComponent's helper) doesn't resolve Lookbook::Preview
    # subclasses, so exercise render_args directly. Symbol keys are required:
    # render_args slices provided params by the method's symbol parameter names.
    result = ViewComponentExamplePreview.render_args(:coerce_symbol, params: {my_param: "bar"})
    block_content = result[:block].call
    expect(block_content).to include("my_param=bar class=Symbol")
  end

  it "coerces params for grouped scenarios" do
    result = render_preview(:grouped_coerce, from: GroupComponentPreview, params: {my_param: "bar"})
    expect(result.text).to include("my_param=bar class=Symbol")
  end
end
