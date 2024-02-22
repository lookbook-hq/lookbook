module Lookbook
  class ScenarioEntity < Entity
    delegate_missing_to :code_object

    def initialize(code_object, preview_entity, default_position: nil)
      @code_object = code_object
      @preview_entity = preview_entity
      @position = default_position
    end

    def id
      @id ||= Utils.id(code_object.name)
    end

    def uuid
      @uuid ||= Utils.hash(preview_entity.id, id)
    end

    def name
      @name ||= Utils.name(code_object.name)
    end

    alias_method :url_param, :name

    def lookup_path
      "#{preview_entity.lookup_path}/#{name}"
    end

    def preview = preview_entity

    def self.icon = :eye

    protected

    attr_reader :code_object, :preview_entity
  end
end
