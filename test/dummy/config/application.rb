require "combustion"

Combustion.path = "test/dummy"
Combustion.initialize! :action_controller, :action_view, :sprockets do
  config.lookbook.project_name = "Lookbook dummy app"
  config.lookbook.preview_paths << "#{root}/previews"
end
