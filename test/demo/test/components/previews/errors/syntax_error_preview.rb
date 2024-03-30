# Preview with an intentional syntax error in the code
module Errors
  class SyntaxErrorPreview < Lookbook::Preview
    def example
      render Elements::HeadingComponent.new do
        "A heading"
      end
    # end
    # Missing `end` statement here
  end
end
