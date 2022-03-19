module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end

    def feature_enabled?(name)
      Lookbook::Features.enabled?(name)
    end
  end
end
