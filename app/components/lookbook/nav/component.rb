module Lookbook
  class Nav::Component < Lookbook::Component
    renders_one :filter, Lookbook::Filter::Component

    def initialize(
      collection:,
      label: nil,
      collapse_singles: false,
      **attrs
    )
      @collection = collection.as_tree
      @label = label
      @item_args = {
        collapse_singles: collapse_singles
      }
      super(**attrs)
    end

    def label
      @label || @collection.label
    end

    def items
      @collection.non_empty_items.map do |item|
        render Lookbook::Nav::Item::Component.new item,
          depth: 1,
          **@item_args
      end
    end

    protected

    def alpine_component
      "navComponent"
    end
  end
end
