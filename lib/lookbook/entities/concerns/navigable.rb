module Lookbook
  module Navigable
    extend ActiveSupport::Concern

    included do
      def hidden?
        fetch_config(:hidden, false)
      end

      def visible?
        !hidden?
      end

      def position
        if @position_prefixes && respond_to?(:file_name)
          PositionPrefixParser.call(file_name).first || 10000
        else
          fetch_config(:position, 10000)
        end
      end

      def depth
        path.split("/").size
      end
    end
  end
end
