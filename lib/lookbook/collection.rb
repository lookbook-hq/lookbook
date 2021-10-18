module Lookbook
  class Collection
    attr_reader :path

    def initialize(path = "")
      @path = path.delete_prefix("/").delete_suffix("/")
      @items = []
    end

    def id
      (@path || "root").underscore.tr("_", "-")
    end

    def name
      @path.present? ? @path.split("/").last : "root"
    end

    def label
      name&.titleize
    end

    def hierarchy_depth
      @path ? @path.split("/").size : 0
    end

    def items(sorted = true)
      sorted ? @items.sort_by(&:label) : @items
    end

    def add(item)
      if item.is_a?(String)
        item = Collection.new([@path, item].join("/"))
      end
      @items << item
      item
    end

    def get(name)
      name = name.underscore
      @items.find { |item| item.name.underscore == name }
    end

    def get_or_create(name)
      get(name).presence || add(name)
    end

    def type
      :collection
    end
  end
end
