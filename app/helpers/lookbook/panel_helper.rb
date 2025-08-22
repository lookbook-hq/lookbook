module Lookbook
  module PanelHelper
    def Panel(**kwargs, &block)
      render Lookbook::PanelComponent.new(**kwargs), &block
    end
  end
end
