class ProseComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::Prose::Component.new do
      %Q(
        # A title 

        And this is **some text**.
        It will be rendered in the prose component output.

        ```ruby
        def example
          puts "This is an example"
        end
        ```
      ).strip_heredoc
    end
  end
end
