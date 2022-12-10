module LookbookDocs
  class ApiClass::Component < Base
    attr_reader :name, :description, :methods, :toc

    def initialize(name:, description: nil, methods: [], toc: nil, **attrs)
      @name = name
      @description = description
      @methods = methods.map(&:symbolize_keys)
      @toc = toc
      @attrs = attrs
    end

    def instance_methods
      methods.filter { |m| m[:scope] == "instance" }
    end

    def class_methods
      methods.filter { |m| m[:scope] == "class" }
    end

    def method_groups
      groups = []
      if class_methods.any?
        groups.push({
          label: "Class Methods",
          methods: class_methods,
          id: "class-methods"
        })
      end

      if instance_methods.any?
        groups.push({
          label: "Instance Methods",
          methods: instance_methods,
          id: "instance-methods"
        })
      end

      groups
    end
  end
end
