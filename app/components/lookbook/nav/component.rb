module Lookbook
  class Nav::Component < Lookbook::BaseComponent
    renders_one :filter, Lookbook::Filter::Component
    renders_one :toolbar, Lookbook::Toolbar::Component

    def initialize(
      collection:, id: nil,
      collapse_singles: false,
      **attrs
    )
      @id = id.presence || "#{collection.id}-nav"
      @collection = collection.as_tree
      @item_args = {
        collapse_singles: collapse_singles
      }
      super(**attrs, id: id)
    end

    def items
      @collection.non_empty_items.map do |item|
        render Lookbook::Nav::Item::Component.new item,
          nav_id: @id,
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
