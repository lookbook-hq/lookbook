module Lookbook
  class Entity
    def id
      raise Lookbook::Error, "Entity subclasses must define an #id method"
    end

    def uuid
      @uuid ||= Utils.hash(id)
    end

    def name
      nil
    end

    def label
      name&.titleize
    end

    def to_param = url_param

    def to_key = [uuid]

    def model_name
      OpenStruct.new param_key: self.class.name.demodulize.underscore
    end
  end
end
