# @id blankslate
class Feedback::BlankSlateComponentPreview < Lookbook::Preview
  # Another example with multiple editable preview params
  #
  # This example also sets uses a `@display` tag to
  # set a max width that this component can grow to.
  #
  # @display max_width 600px
  #
  # @param icon toggle "Show/hide the icon"
  # @param title
  # @param content textarea { rows: 3, placeholder: "Main body content goes here..." }
  # @param text select :button_text_options
  def default(icon: false, content: "Nothing here yet. Just waiting for your content!", title: "This is the title", text: nil)
    render Feedback::BlankSlateComponent.new(with_icon: icon) do |slate|
      slate.with_title { title } if title.present?
      slate.with_action { text } if text.present?
      content
    end
  end

  private

  def button_text_options
    {
      label: "Button Text",
      description: "Some recommended button text samples",
      choices: [
        ["No text", nil],
        "Do this!",
        "Next thing",
        "Get me out of here"
      ]
    }
  end
end
