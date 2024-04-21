module Lookbook
  module UI
    class Header < BaseComponent
      def initialize
      end

      def project_name
        config.project_name
      end
    end
  end
end
