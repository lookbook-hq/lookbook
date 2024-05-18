module Lookbook
  module UI
    class Header < BaseComponent
      def project_name
        Project.name.presence || "Lookbook"
      end

      def project_links
        Project.links.reject { _1.show == false }
      end
    end
  end
end
