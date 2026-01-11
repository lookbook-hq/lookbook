module Lookbook
  module Configurable
    extend ActiveSupport::Concern

    included do
      def config
        Lookbook.config
      end
    end

    class_methods do
      def config
        Lookbook.config
      end
    end
  end
end
