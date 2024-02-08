module Lookbook
  class EntityStore
    def initialize(klass = Entity, collection = EntityCollection)
      @entities = []
      @entity_class = klass
      @collection_class = collection
    end

    def add(*entities)
      entities.each do |entity|
        validate!(entity)
        @entities.push(entity)
      end
    end

    def replace(*entities)
      entities.each do |entity|
        validate!(entity)
        i = index(entity)
        @entities[i] = entity unless i.nil?
      end
    end

    def remove(*entities)
      entities.each do |entity|
        i = index(entity)
        @entities.delete_at(i) unless i.nil?
      end
    end

    def replace_all(entities)
      clear
      add(*entities)
    end

    def clear
      @entities.clear
    end

    def include?(entity)
      !index(entity).nil?
    end

    def index(entity)
      @entities.index { _1 == entity }
    end

    def to_a
      @entities
    end

    def to_collection
      @collection_class ? @collection_class.new(@entities) : to_a
    end

    protected

    def validate!(entity)
      if @entity_class && !entity.is_a?(@entity_class)
        raise "Store: #{entity.class.name} must be a #{@entity_class} instance"
      end
    end
  end
end
