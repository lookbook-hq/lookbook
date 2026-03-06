class GroupedPreview < Lookbook::Preview
  def default
    render ExampleComponent.new
  end

  # @!group Sizes

  def small
    render ExampleComponent.new(size: :small)
  end

  def medium
    render ExampleComponent.new(size: :medium)
  end

  def large
    render ExampleComponent.new(size: :large)
  end

  # @!endgroup

  def themed
    render ExampleComponent.new(theme: :primary)
  end
end
