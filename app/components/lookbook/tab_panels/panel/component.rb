module Lookbook
  class TabPanels::Panel::Component < Lookbook::BaseComponent
    def initialize(name:, id: nil, **html_attrs)
      @name = name 
      @id = "#{id || "panel-#{name}"}"
      super(**html_attrs)
    end
  end
end
