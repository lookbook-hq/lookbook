class ToolbarComponentPreview < ViewComponent::Preview
  # @!group
  def single_section
    render Lookbook::Toolbar::Component.new do |toolbar|
      toolbar.section do
        "Section content"
      end
    end
  end

  def multiple_sections
    render Lookbook::Toolbar::Component.new do |toolbar|
      toolbar.section do
        "Section 1"
      end
      toolbar.section do
        "Section 2"
      end
      toolbar.section align: :right do
        "Section 3 aligned right"
      end
      toolbar.section divide: :left do
        "Section 4 left divider"
      end
    end
  end

  # @label With Buttons
  def button_section
  end

  # @label With Tabs
  def tabs_section
  end

  # @!endgroup
end
