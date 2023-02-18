Combustion.path = "spec/dummy"
Combustion.initialize! :action_controller, :action_view do
  ActiveSupport::Deprecation.silenced = true

  config.view_component.view_component_path = "app/components"
  config.view_component.preview_paths << "test/components/previews"

  config.lookbook.project_name = "Lookbook Test App"
  config.lookbook.listen = false

  config.autoload_paths << "#{root}/app"

  Lookbook.add_tag(:customtag)
end
