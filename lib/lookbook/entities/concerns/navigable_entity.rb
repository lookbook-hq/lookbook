module Lookbook
  # @api private
  module NavigableEntity
    extend ActiveSupport::Concern

    included do
      def hidden?
        fetch_config(:hidden, false)
      end

      def visible?
        !hidden?
      end

      def priority
        return @_priority if @_priority

        pos = if @priority_prefixes && respond_to?(:file_name)
          PriorityPrefixParser.call(file_name).first || fetch_config(:priority, default_priority)
        else
          fetch_config(:priority, default_priority)
        end

        @_priority ||= pos.to_i
      end

      def depth
        path.split("/").size
      end

      def default_priority
        @default_priority || 10000
      end

      def <=>(other)
        if respond_to?(:sort_handler, true)
          sort_handler(other)
        else
          [priority, label] <=> [other.priority, other.label]
        end
      end
    end
  end
end
