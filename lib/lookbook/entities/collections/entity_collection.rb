module Lookbook
  class EntityCollection
    include Enumerable

    delegate_missing_to :entities

    attr_reader :entities

    def initialize(entities = nil)
      @_cache = {}
      @entities = []
      add(entities)
    end

    def add(to_add = nil)
      Array(to_add).each do |entity|
        unless find_by_path(entity.path)
          @entities.push(entity)
        end
      end
      clear_cache
    end

    def find_by_id(id)
      id = Utils.id(id)
      find { |entity| entity.id == id }
    end

    def find_by_path(path)
      find { |entity| entity.path.to_s == path.to_s }
    end

    def next(entity)
      index = find_index { |i| i.path == entity.path }
      entities[index + 1] unless index.nil?
    end

    def previous(entity)
      index = find_index { |i| i.path == entity.path }
      entities[index - 1] if !index.nil? && index > 0
    end

    def each(&block)
      if block
        entities.sort.each { |entity| yield entity }
      else
        to_enum(:each)
      end
    end

    def flat_map(...)
      map(...).map(&:to_a).flatten
    end

    protected

    def clear_cache
      @_cache = {}
    end
  end
end
