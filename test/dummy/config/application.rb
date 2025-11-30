require "action_view/railtie"
require "rails/test_unit/railtie"
require "action_controller/railtie"
require "view_component"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dummy
  class Application < Rails::Application
    YARD::Logger.instance.level = YARD::Logger::ERROR

    config.middleware.use Rack::Deflater

    config.load_defaults Rails::VERSION::STRING.to_f

    config.default_url_options = {host: "localhost"}
    config.action_controller.default_url_options = {host: "localhost"}

    # Lookbook configuration

    config.lookbook.project_name = "Lookbook dev app"

    config.lookbook.preview_paths << "previews/#{Rails.env.test? ? "test" : "dev"}"

    config.lookbook.page_paths << "docs"

    config.lookbook.listen = Rails.env.development?

    config.lookbook.preview_layout = "preview"

    Lookbook.add_tag(:customtag)
  end
end
