module Shared
  class Note < Shared::Base
    def initialize(theme: :info, **attrs)
      @theme = theme.to_sym
      @attrs = attrs
    end

    def root_classes
      @attrs[:class]
    end
  end
end