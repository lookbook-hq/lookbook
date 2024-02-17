module Lookbook
  module ComponentsHelper
    def lb_app(**kwargs, &block)
      render Lookbook::UI::App.new(**kwargs), &block
    end

    def lb_inspector(**kwargs, &block)
      render Lookbook::UI::Inspector.new(**kwargs), &block
    end

    def lb_tab_group(**kwargs, &block)
      render Lookbook::UI::TabGroup.new(**kwargs), &block
    end
  end
end
