module Shared
  class Note < Shared::Base
    ICONS = {
      info: :message_solid
    }

    attr_reader :theme

    def initialize(theme: :info, **attrs)
      @theme = theme.to_sym
      @attrs = attrs
    end

    def icon_name
      ICONS[theme]
    end
  end
end
