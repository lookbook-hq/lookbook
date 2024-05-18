module Lookbook
  module Project
    class << self
      def name
        Lookbook.config.project_name
      end

      def links
        Lookbook.config.project_links.map { DataObject.new(_1) }
      end
    end
  end
end
