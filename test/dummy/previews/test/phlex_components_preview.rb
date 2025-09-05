class PhlexComponentsPreview < Lookbook::Preview
  def default
    render Views::Phlex::BasicExample.new
  end

  def helpers
    render Views::Phlex::HelpersExample.new
  end

  def builder
    render Views::Phlex::ListExample.new do |list|
      list.item { "Hello" }
      list.item { "World" }
    end
  end
end
