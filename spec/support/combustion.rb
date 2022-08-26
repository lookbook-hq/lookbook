Combustion.path = "spec/dummy"
Combustion.initialize! :action_controller, :action_view do
  config.view_component.view_component_path = "app/components"
  config.view_component.preview_paths << "test/components/previews"

  config.lookbook.project_name = "Lookbook Test App"
  config.lookbook.listen = false

  config.after_initialize do
    config.lookbook.preview_paths = []
    config.lookbook.page_paths = []
  end
end
