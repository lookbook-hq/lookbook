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
      path_name.gsub(/^(\d+?)-/, "")
    end

    def label
      name&.titleize
    end

    def position
      matches = path_name.match(/^(\d+?)-/)
      matches ? matches[1].to_i : 0
    end

    def hierarchy_depth
      @path ? @path.split("/").size : 0
    end

    def items(sort_by: :label)
      case sort_by
      when :label
        @items.sort_by(&:label)
      when :position
        @items.sort_by(&:position)
      else
        @items
      end
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

    protected

    def path_name
      @path.present? ? @path.split("/").last : "root"
    end
  end
end
