module Lookbook
  module UI
    class Breadcrumbs < BaseComponent
      def initialize(items: [], **kwargs)
        @items = items
      end

      def items
        @items.map do |item|
          if item.is_a?(String)
            {label: item, url: nil}
          else
            {label: item.label, url: item.url_path}
          end
        end.compact
      end
    end
  end
end
