module Views
  module Phlex
    class BasicExample < ::Phlex::HTML
      def view_template
        p { "phlex component" }
      end
    end
  end
end
