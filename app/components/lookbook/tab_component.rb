module Lookbook
  class TabComponent < Component
    attr_reader :panel, :label

    def initialize(label:, panel:, **kwargs)
      @panel = panel.to_s.downcase.dasherize
      @label = label

      super(**kwargs)
    end
  end
end
