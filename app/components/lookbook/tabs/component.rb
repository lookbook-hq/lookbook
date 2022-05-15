module Lookbook
  class Tabs::Component < Lookbook::Component
    renders_many :tabs, ->(ref: nil, **attrs) do
      @tab_counter += 1
      ref ||= "tab-#{@tab_counter}"
      id = "#{@id}-#{ref}"
      attrs = {
        ref: ref,
        id: id,
        position: @tab_counter,
        **attrs
      }
      dropdown_tab(**attrs)
      Lookbook::Tabs::Tab::Component.new(**attrs)
    end

    renders_many :dropdown_tabs, ->(ref:, **attrs) do
      Lookbook::Tabs::DropdownTab::Component.new(ref: "dropdown-#{ref}", **attrs)
    end

    def initialize(id:, **html_attrs)
      @id = id
      @tab_counter = 0
      super(id: id, **html_attrs)
    end

    protected

    def alpine_component
      "tabsComponent"
    end
  end
end
