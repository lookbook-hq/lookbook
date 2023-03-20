class PhlexExamplePreview < Lookbook::Preview
  def default
    render Views::Phlex::BasicExample.new
  end

  def helpers
    render Views::Phlex::HelpersExample.new
  end

  def transform
    render_args = render Views::Phlex::BasicExample.new
    render_args[:output_transformer] = ->(html) { "<span>transformed</span>#{html}".html_safe }
    render_args
  end
end
