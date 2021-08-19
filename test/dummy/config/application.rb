require_relative "boot"

require "rails"

require "active_storage/engine"
require "action_controller/railtie"
require "action_view/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

require "lookbook"

module Dummy
  class Application < Rails::Application
    config.load_defaults Rails::VERSION::STRING.to_f

    config.view_component.preview_paths << Rails.root.join("test/components/more_previews")
    
  end
end
