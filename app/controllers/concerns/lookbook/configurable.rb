module Lookbook
  module Configurable
    extend ActiveSupport::Concern

    included do
      protected

      def assign_config
        @config = Lookbook.config
      end
    end
  end
end
