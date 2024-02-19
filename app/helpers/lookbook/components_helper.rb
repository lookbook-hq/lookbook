module Lookbook
  module ComponentsHelper
    def lb_app(**kwargs, &block)
      render Lookbook::UI::App.new(**kwargs), &block
    end

    def lb_inspector(**kwargs, &block)
      render Lookbook::UI::Inspector.new(**kwargs), &block
    end

    def lb_tab_group(id = nil, **kwargs, &block)
      render Lookbook::UI::TabGroup.new(id: id, **kwargs), &block
    end

    def lb_pane(id = nil, **kwargs, &block)
      render Lookbook::UI::Pane.new(id: id, **kwargs), &block
    end
  end
end
