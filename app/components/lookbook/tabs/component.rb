module Lookbook
  class Tabs::Component < Lookbook::Component
    renders_many :tabs, ->(ref: nil, **attrs) do
      @tab_counter += 1
      ref ||= "tab-#{@tab_counter}"
      attrs = {
        ref: ref,
        position: @tab_counter,
        **attrs
      }
      dropdown_tab(**attrs)
      Lookbook::Tabs::Tab::Component.new(**attrs)
    end

    renders_many :dropdown_tabs, ->(ref:, **attrs) do
      Lookbook::Tabs::DropdownTab::Component.new(ref: "dropdown-#{ref}", **attrs)
    end

    def initialize(**html_attrs)
      @tab_counter = 0
      super(**html_attrs)
    end

    protected

    def alpine_component
      "tabsComponent"
    end
  end
end
