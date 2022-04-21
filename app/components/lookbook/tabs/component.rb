module Lookbook
  class Tabs::Component < Lookbook::Component
    renders_many :tabs, ->(ref = nil, **attrs) do
      @tab_counter += 1
      ref ||= "tab-#{@tab_counter}"
      id = "#{@id}-#{ref}"
      Lookbook::Tabs::Tab::Component.new(ref: ref, id: id, **attrs)
    end

    def initialize(*args, id:, **html_attrs)
      @id = id
      @tab_counter = 0
      super(*args, id: id, **html_attrs)
    end

    protected

    def alpine_component
      "tabsComponent"
    end
  end
end
