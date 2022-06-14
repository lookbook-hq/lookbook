module Lookbook
  class Tabs::Component < Lookbook::Component
    renders_many :tabs, ->(**attrs) do
      @tab_counter += 1
      attrs[:name] ||= "tab-#{@tab_counter}"
      attrs[:position] ||= @tab_counter
      dropdown_tab(**attrs)
      Lookbook::Tabs::Tab::Component.new(**attrs)
    end

    renders_many :dropdown_tabs, ->(name:, **attrs) do
      Lookbook::Tabs::DropdownTab::Component.new(name: "dropdown-#{name}", **attrs)
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
