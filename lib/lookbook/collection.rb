module Lookbook
  class Collection
    include Utils
    include Enumerable

    attr_reader :path

    def initialize(path = "", items = [])
      if path.is_a?(Array)
        @items = path
        path = ""
      else
        @items = items
      end
      @path = path.delete_prefix("/").delete_suffix("/")
    end

    def each(&block)
      items.each(&block)
    end

    def id
      generate_id(lookup_path || "root")
    end

    def name
      @name ||= remove_position_prefix(basename)
    end

    def label
      name&.titleize
    end

    def lookup_path
      @lookup_path ||= to_lookup_path(@path)
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

    def visible_items
      reject { |i| i.hidden? }
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
      items.find { |item| item.name.underscore == name }
    end

    def get_or_create(name)
      get(remove_position_prefix(name)).presence || add(name)
    end

    def find(lookup = nil, &block)
      if lookup
        lookup.is_a?(Symbol) ? find_by_id(lookup.to_s.tr("_", "-")) : find_by_path(lookup)
      elsif block
        items.find(&block)
      end
    end

    def find_by_id(id)
      items.find { |i| i.id == id }
    end

    def find_by_path(path)
      items.find { |i| i.lookup_path == path }
    end

    def find_parent(child)
      parent_path = child.lookup_path.split("/").pop.join("/")
      find_by_path(parent_path)
    end

    def ordered_entities
      entities = []
      as_tree.items.each do |item|
        entities.append(item.is_a?(Collection) ? item.ordered_entities : item)
      end
      entities.flatten
    end

    def find_next(item)
      index = ordered_entities.find_index { |i| i.lookup_path == item.lookup_path }
      ordered_entities[index + 1] unless index.nil?
    end

    def find_previous(item)
      index = ordered_entities.find_index { |i| i.lookup_path == item.lookup_path }
      ordered_entities[index - 1] if !index.nil? && index > 0
    end

    def as_tree(filter_hidden: true)
      return self if hierarchy_depth > 0
      return @tree if @tree
      @tree = self.class.new
      candidates = filter_hidden ? visible_items : items
      candidates.each do |item|
        current = @tree
        if item.hierarchy_depth == 1
          current.add(item)
        else
          item.parent_collections_names.each.with_index(1) do |name, i|
            target = current.get_or_create(name)
            if item.hierarchy_depth == i + 1
              target.add(item)
            else
              current = target
            end
          end
        end
      end
      @tree
    end

    def type
      :collection
    end

    protected

    def basename
      @path.present? ? @path.split("/").last : ""
    end

    class << self
      def describe_as
        "items"
      end
    end
  end
end
