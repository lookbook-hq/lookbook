module Lookbook
  class TabbedContent::Section::Component < Lookbook::Component
    def initialize(ref:, id: nil, **html_attrs)
      @ref = ref
      @id = id || ref
      super(**html_attrs)
    end
  end
end
