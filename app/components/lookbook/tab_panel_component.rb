module Lookbook
  class TabPanelComponent < Component
    attr_reader :name

    def initialize(name:, **kwargs)
      @name = name.to_s.downcase.dasherize

      super(**kwargs)
    end
  end
end
