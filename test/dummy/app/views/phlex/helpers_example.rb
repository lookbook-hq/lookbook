module Views
  module Phlex
    class HelpersExample < ::Phlex::HTML
      include ::Phlex::Rails::Helpers::Routes

      def view_template
        a(href: root_path) { "click here to go to lookbook" }
      end
    end
  end
end
