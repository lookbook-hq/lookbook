require_relative "boot"

require "rails"

require "action_controller/railtie"
require "action_view/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

require "lookbook"

module Dummy
  class Application < Rails::Application
    config.load_defaults Rails::VERSION::STRING.to_f

    config.view_component.preview_paths << Rails.root.join("test/components/more_previews")
    config.view_component.preview_controller = "PreviewController"
    config.view_component.default_preview_layout = "component_preview"

    config.lookbook.preview_display_params = {
      text_color: "red",
      foo_count: 1
    }

    config.lookbook.experimental_features = true
  end
end
