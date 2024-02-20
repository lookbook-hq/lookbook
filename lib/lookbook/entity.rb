module Lookbook
  class Entity
    send(:include, Lookbook::Engine.routes.url_helpers) # YARD parsing workaround: https://github.com/lsegal/yard/issues/546

    def id
      raise Lookbook::Error, "Entity subclasses must define an #id method"
    end

    def uuid
      @uuid ||= Utils.hash(id)
    end

    def name = nil

    def label
      Utils.label(name) if name
    end

    def inspect_path = nil

    def to_param = url_param

    def to_key = [uuid]

    def model_name
      OpenStruct.new param_key: self.class.name.demodulize.underscore
    end
  end
end
