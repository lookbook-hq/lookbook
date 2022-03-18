module Lookbook
  class Collection
    include Utils

    attr_reader :path

    def initialize(path = "")
      @path = path.delete_prefix("/").delete_suffix("/")
      @items = []
    end

    def id
      generate_id(url_path || "root")
    end

    def name
      parse_position_prefix(basename).last
    end

    def label
      name&.titleize
    end

    def url_path
      @url_path ||= @path.split("/").map { |segment| parse_position_prefix(segment).last }.join("/")
    end

    def position
      @position ||= parse_position_prefix(basename).first
    end

    def hierarchy_depth
      @path ? @path.split("/").size : 0
    end

    def items
      @items.sort_by { |item| [item.position, item.label] }
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
      get(parse_position_prefix(name).last).presence || add(name)
    end

    def type
      :collection
    end

    protected

    def basename
      @path.present? ? @path.split("/").last : "root"
    end
  end
end
