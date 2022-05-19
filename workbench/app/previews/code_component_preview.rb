class CodeComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::Code::Component.new language: "html" do
      %(
        <h1>HTML Example</h1>
        <p>This is some highlighted code</p>
      )
    end
  end

  # @label With line numbers
  def numbered
    render Lookbook::Code::Component.new language: "ruby", line_numbers: true do
      %(
        def foo(bar)
          baz = bar * 3
          do_this(baz)
        end
      )
    end
  end
end
