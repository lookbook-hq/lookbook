module Lookbook
  class ToolbarComponent < Component
    include SlotableConcern

    attr_reader :title

    def initialize(title: nil, **kwargs)
      @title = title

      super(**kwargs)
    end

    def title?
      @title.present?
    end
  end
end
