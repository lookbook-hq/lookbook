module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end
  end
end
