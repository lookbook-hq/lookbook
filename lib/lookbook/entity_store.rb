module Lookbook
  class EntityStore
    attr_reader :updated_at

    def initialize(klass = Entity)
      @entities = []
      @entity_class = klass
      @updated_at = Utils.current_timestamp_milliseconds
    end

    def add(*entities)
      entities.each do |entity|
        validate!(entity)
        @entities.push(entity)
      end
      updated!
    end

    def replace(*entities)
      entities.each do |entity|
        validate!(entity)
        i = index(entity)
        @entities[i] = entity unless i.nil?
      end
      updated!
    end

    def remove(*entities)
      entities.each do |entity|
        i = index(entity)
        @entities.delete_at(i) unless i.nil?
      end
      updated!
    end

    def replace_all(entities)
      @entities.clear
      add(*entities)
    end

    def clear
      @entities.clear
      updated!
    end

    def include?(entity)
      !index(entity).nil?
    end

    def index(entity)
      @entities.index { _1 == entity }
    end

    def all
      @entities
    end

    alias_method :to_a, :all

    protected

    def updated!
      @updated_at = Utils.current_timestamp_milliseconds
      @tree = nil
    end

    def validate!(entity)
      if @entity_class && !entity.is_a?(@entity_class)
        raise "Store: #{entity.class.name} must be a #{@entity_class} instance"
      end
    end
  end
end
