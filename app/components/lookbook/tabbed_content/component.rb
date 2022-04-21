module Lookbook
  class TabbedContent::Component < Lookbook::Component
    renders_many :sections, ->(ref = nil, id: nil, **attrs) do
      @section_counter += 1
      ref ||= "tab-#{@section_counter}"
      id ||= "#{@id}-#{ref}"
      Lookbook::TabbedContent::Section::Component.new ref: ref, id: id, **attrs
    end

    def initialize(*args, id:, **html_attrs)
      @id = id
      @section_counter = 0
      super(*args, id: id, **html_attrs)
    end

    protected

    def alpine_component
      "tabbedContentComponent"
    end
  end
end
