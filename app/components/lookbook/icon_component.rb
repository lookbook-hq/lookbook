module Lookbook
  class IconComponent < Component
    attr_reader :name, :style

    def initialize(name, style: :regular, **kwargs)
      @name = name.to_s
      @style = ActiveSupport::StringInquirer.new(style.to_s)

      super(**kwargs)
    end

    def class_name
      "ph-#{name.dasherize}"
    end

    def family
      style.regular? ? "ph" : "ph-#{style}"
    end
  end
end
