require "combustion"

Combustion.path = "test/demo"
Combustion.initialize! :action_controller, :action_view, :action_mailer, :sprockets do
  config.autoload_paths << "#{root}/app/views/components"

  config.view_component.default_preview_layout = "preview"

  config.lookbook.project_name = "Lookbook v3 test app"
  config.lookbook.project_links = [{
    label: "Github",
    url: "https://github.com/ViewComponent/lookbook/tree/v3",
    icon: :github,
    attrs: {target: "_blank"}
  }]

  config.lookbook.preview_display_options = {
    max_width: "100%",
    color_scheme: {
      label: "Color scheme",
      choices: [
        ["Dark", "dark"],
        ["Light", "light"]
      ],
      default: "light"
    }
  }

  config.lookbook.preview_paths << "#{root}/lookbook/previews"
  config.lookbook.page_paths << "#{root}/lookbook/docs"

  config.lookbook.ui_status_bar = true
end
