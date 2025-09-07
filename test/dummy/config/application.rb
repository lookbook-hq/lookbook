require "action_view/railtie"
require "rails/test_unit/railtie"
require "action_controller/railtie"
require "propshaft"

require "lookbook"
require "view_component"
require "phlex-rails"

module Dummy
  class Application < Rails::Application
    YARD::Logger.instance.level = YARD::Logger::ERROR

    config.load_defaults Rails::VERSION::STRING.to_f
    config.action_controller.default_url_options = {host: "localhost"}

    # Lookbook configuration

    Lookbook.add_tag(:customtag)

    config.lookbook.project_name = "Lookbook dev app"

    config.lookbook.listen = Rails.env.development?
    config.lookbook.using_view_component = true

    config.lookbook.preview_paths << "#{root}/previews/#{Rails.env.test? ? "test" : "dev"}"
    config.lookbook.preview_layout = "preview"
  end
end
