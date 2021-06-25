require "rails"
require "view_component"

module Lookbook

  class << self
    def config
      Engine.config.lookbook
    end
  end

  class Engine < ::Rails::Engine
    isolate_namespace Lookbook

    Lookbook.autoload :Preview, "lookbook/preview"
    Lookbook.autoload :Navigation, "lookbook/navigation"
    Lookbook.autoload :Comment, "lookbook/comment"
  
    config.app_middleware.use(
      Rack::Static,
      urls: ["/lookbook"], root: Lookbook::Engine.root.join("public").to_s
    )

    ActiveSupport.on_load(:view_component) do
      ViewComponent::Preview.extend Lookbook::Preview
    end
    
  end
end
