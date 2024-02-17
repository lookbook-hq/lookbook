module Lookbook
  module ComponentsHelper
    def lb_app(**kwargs, &block)
      render Lookbook::UI::App.new(**kwargs), &block
    end
  end
end
