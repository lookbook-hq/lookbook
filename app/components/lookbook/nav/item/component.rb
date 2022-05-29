module Lookbook
  class Nav::Item::Component < Lookbook::Component
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
      depth: 1,
      collapse_singles: false,
      **html_attrs
    )
      @item = item
      @depth = depth
      @collapse_singles = collapse_singles
      super(**html_attrs)
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
          render Lookbook::Nav::Item::Component.new item,
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

    def nav_icon(entity)
      ICONS[entity.type] || :file
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
      {
        id: @item.id,
        matchers: item.is_a?(Lookbook::Collection) ? nil : item.matchers
      }.to_json
    end

    def alpine_component
      "navItemComponent"
    end
  end
end
