module Lookbook
  class Status
    attr_reader :color, :description

    def initialize(name, label: nil, color: :gray, description: nil)
      @name = name
      @label = label
      @color = color
      @description = description
    end

    def name
      Utils.name(@name, true)
    end

    def label
      @label || Utils.label(@name)
    end

    def to_s = label
  end
end
