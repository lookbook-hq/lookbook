module Lookbook
  class InspectorPanel
    attr_reader :name, :partial, :label, :type

    def initialize(name, partial, label: nil, type: nil, **kwargs)
      @name = Utils.name(name).to_sym
      @partial = partial
      @label = label || name.titleize
      @type = type || :default
    end
  end
end
