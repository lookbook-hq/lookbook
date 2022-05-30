module Lookbook
  class TabbedContent::Component < Lookbook::Component
    renders_many :sections, ->(ref: nil, **attrs) do
      @section_counter += 1
      ref ||= "tab-#{@section_counter}"
      Lookbook::TabbedContent::Section::Component.new ref: ref, **attrs
    end

    def initialize(**html_attrs)
      @section_counter = 0
      super(**html_attrs)
    end

    protected

    def alpine_component
      "tabbedContentComponent"
    end
  end
end
