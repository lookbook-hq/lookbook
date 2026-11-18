class PhlexExamplePreview < Lookbook::Preview
  def default
    render Views::BasicExample.new
  end

  def helpers
    render Views::HelpersExample.new
  end

  def builder
    render Views::ListExample.new do |list|
      list.item { "Hello" }
      list.item { "World" }
    end
  end

  def nested_render
    render Components::SimpleButton.new do
      render Components::SimpleIcon.new

      plain "A simple button"
    end
  end

  def nested_render_class
    render Components::SimpleButton do
      render Components::SimpleIcon

      plain "A simple button"
    end
  end
end
