module Lookbook
  class EntityStore
    include Enumerable

    delegate :each, :clear, to: :@entities

    def initialize
      @entities = []
    end

    def add(*entities)
      entities.each { @entities.push(_1) }
    end

    def replace(*entities)
      entities.each do |entity|
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

    def include?(entity)
      !index(entity).nil?
    end

    def index(entity)
      @entities.index { _1.id == entity.id }
    end

    def all = @entities

    alias_method :to_a, :all
  end
end
