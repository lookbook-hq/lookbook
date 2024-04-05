require "combustion"

Combustion.path = "test/demo"
Combustion.initialize! :action_controller, :action_view, :action_mailer, :sprockets do
  config.view_component.default_preview_layout = "preview"
  config.autoload_paths << "#{root}/app/views/components"
end
