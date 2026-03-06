module Docs
  module Usage
    class BasicPreview < Lookbook::Preview
      def view_component
        render SomeComponent.new do
          "ViewComponent"
        end
      end

      def phlex
        render AnotherComponent do
          plain "Phlex"
        end
      end
    end
  end
end
