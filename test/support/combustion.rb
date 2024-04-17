require "combustion"

Combustion.path = "test/demo"
Combustion.initialize! :action_controller, :action_view, :action_mailer, :sprockets do
  config.autoload_paths << "#{root}/app/views/components"

  config.view_component.default_preview_layout = "preview"

  config.lookbook.preview_paths << "#{root}/lookbook/previews"
  config.lookbook.page_paths << "#{root}/lookbook/docs"
end
