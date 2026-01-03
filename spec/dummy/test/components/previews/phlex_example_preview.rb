class PhlexExamplePreview < Lookbook::Preview
  def default
    render Views::BasicExample.new
  end

  def helpers
    render Views::HelpersExample.new
  end

  def builder
    render Views::ListExample do |list|
      list.item { 'Hello' }
      list.item { 'World' }
    end
  end

  def nested_render
    render Components::SimpleButton.new do
      render Components::SimpleIcon.new

      plain 'A simple button'
    end
  end
end
