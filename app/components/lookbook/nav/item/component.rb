module Lookbook
  class Nav::Item::Component < Lookbook::BaseComponent
    ICONS = {
      page: :file,
      page_collection: :folder,
      preview_collection: :folder,
      preview: :layers,
      example: :eye,
      group: :eye,
      collection: :folder
    }.freeze

    delegate :label, to: :@item

    def initialize(
      item,
      nav_id:,
      depth: 1,
      collapse_singles: false,
      **html_attrs
    )
      @nav_id = nav_id
      @item = item
      @depth = depth
      @collapse_singles = collapse_singles
      super(**html_attrs)
    end

    def id
      "#{@nav_id}-#{@item.id}"
    end

    def left_pad
      ((@depth - 1) * 12) + 24
    end

    def href
      if collapsed?
        item.url_path
      elsif !collection?
        item.url_path
      end
    end

    def children
      @children ||= if collection? && !collapsed?
        item.non_empty_items.map do |item|
          lookbook_render Lookbook::Nav::Item::Component.new item,
            nav_id: @nav_id,
            depth: (@depth + 1),
            collapse_singles: @collapse_singles
        end
      else
        []
      end
    end

    def item
      collapsed? ? @item.first : @item
    end

    def nav_icon
      ICONS[@item.type] || :file
    end

    def collection?
      @item.is_a? Lookbook::Collection
    end

    def children?
      children.any? if collection? && !collapsed?
    end

    def collapsed?
      @collapse_singles == true && collection? && @item.collapsible? && @item.one?
    end

    protected

    def alpine_data
      alpine_encode({
        id: @item.id,
        matchers: item.is_a?(Lookbook::Collection) ? nil : item.matchers
      })
    end

    def alpine_component
      "navItemComponent"
    end
  end
end
