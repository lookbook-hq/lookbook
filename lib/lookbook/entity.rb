module Lookbook
  class Entity
    send(:include, Lookbook::Engine.routes.url_helpers) # YARD parsing workaround: https://github.com/lsegal/yard/issues/546

    def id
      raise Lookbook::Error, "Entity subclasses must define an #id method"
    end

    def uuid
      @uuid ||= Utils.hash("#{type}#{id}")
    end

    def name = nil

    def label
      Utils.label(name) if name
    end

    def title
      label
    end

    def visible?
      !hidden?
    end

    def hidden?
      false
    end

    def priority
      default_priority || 0
    end

    attr_reader :default_priority

    def type
      @type ||= self.class.name.demodulize.underscore.delete_suffix("_entity").to_sym
    end

    def <=>(other)
      [priority || Float::INFINITY, label] <=> [other.priority || Float::INFINITY, other.label]
    end

    def parent_lookup_path = nil

    def url_path = nil

    def to_param = url_param

    def to_key = [uuid]

    def model_name
      OpenStruct.new param_key: type
    end

    def to_h
      {
        type: type,
        id: id,
        uuid: uuid,
        name: name,
        label: label,
        hidden: hidden?
      }
    end

    def to_json
      Utils.deep_camelize_keys(to_h)
    end
  end
end
