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
        return @_position if @_position

        pos = if @position_prefixes && respond_to?(:file_name)
          PositionPrefixParser.call(file_name).first || default_position
        else
          fetch_config(:position, default_position)
        end

        @_position ||= pos.to_i
      end

      def depth
        path.split("/").size
      end

      def default_position
        @default_position || 10000
      end

      def <=>(other)
        if respond_to?(:sort_handler, true)
          sort_handler(other)
        else
          [position, label] <=> [other.position, other.label]
        end
      end
    end
  end
end
