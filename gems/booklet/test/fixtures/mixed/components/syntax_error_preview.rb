# This file has an intentional syntax error in it
module Components
  module Elements
    class SyntaxErrorPreview < Lookbook::Preview
      def default
        render SomeComponent.new

    end
  end
end
