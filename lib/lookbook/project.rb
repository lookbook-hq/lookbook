module Lookbook
  module Project
    class << self
      def name
        Lookbook.config.project_name
      end

      def links
        DataObject.array(Lookbook.config.project_links)
      end
    end
  end
end
