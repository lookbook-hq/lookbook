require_relative "boot"

require "rails"
require "propshaft"
require "action_view/railtie"
require "rails/test_unit/railtie"
require "action_controller/railtie"

Bundler.require(*Rails.groups)

module Dummy
  class Application < Rails::Application
    config.load_defaults Rails::VERSION::STRING.to_f

    config.lookbook.project_name = "Lookbook dummy app"
    config.lookbook.preview_paths << "#{root}/previews"
  end
end
