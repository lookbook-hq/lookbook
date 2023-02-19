class PhlexExamplePreview < Lookbook::Preview
  def default
    render Views::Phlex::BasicExample.new
  end

  def helpers
    render Views::Phlex::HelpersExample.new
  end
end
