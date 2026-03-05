class Elements::HeaderComponentPreview < Lookbook::Preview
  # You can edit the text for this example using
  # the field in the Params section.
  #
  # @param text
  def standard(text: "This is some header text")
    render Elements::HeaderComponent.new do
      text
    end
  end

  # @!group Sizes

  def small
    render Elements::HeaderComponent.new(size: 20) do
      "Small header"
    end
  end

  def medium
    render Elements::HeaderComponent.new(size: 30) do
      "Medium header"
    end
  end

  def big
    render Elements::HeaderComponent.new(size: 44) do
      "Big header"
    end
  end

  # @!endgroup
end
