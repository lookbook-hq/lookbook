module Views
  module Phlex
    class ListExample < ::Phlex::HTML
      def view_template
        ul { yield }
      end

      def item(...)
        render Item.new(...)
      end
    end

    class Item < ::Phlex::HTML
      def view_template
        li { yield }
      end
    end
  end
end
