module Lookbook
  class EntityCollection
    include Enumerable

    delegate_missing_to :entities

    def initialize(entities = nil)
      @entities = entities.to_a
    end

    def find_by_id(id)
      @entities.find { _1.id == id }
    end

    def find_by_url_param(url_param)
      @entities.find { _1.url_param == url_param }
    end

    def find_by_lookup_path(lookup_path)
      @entities.find { _1.lookup_path == lookup_path }
    end

    def each(...)
      entities.each(...)
    end

    def to_a = entities

    protected

    attr_reader :entities
  end
end
