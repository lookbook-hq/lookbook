module Lookbook
  class EntityCollection
    include Enumerable

    delegate_missing_to :entities

    attr_reader :entities

    def initialize(entities = nil)
      @entities = entities.to_a
    end

    def each(...)
      entities.each(...)
    end

    def to_a
      entities
    end
  end
end
