require "combustion"

Combustion.path = "test/demo"
Combustion.initialize! :action_controller, :action_view, :action_mailer, :sprockets do
  config.autoload_paths << "#{root}/app/views/components"

  # ViewComponent config

  config.view_component.default_preview_layout = "preview"

  # Project config

  config.lookbook.project_name = "Lookbook v3 demo"
  config.lookbook.project_links = [{
    label: "Github",
    url: "https://github.com/lookbook-hq/lookbook/tree/v3",
    icon: :github,
    attrs: {target: "_blank"}
  }]

  # Previews config

  config.lookbook.preview_paths << "#{root}/lookbook/previews"
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

  # Pages config

  config.lookbook.page_paths << "#{root}/lookbook/docs"
  config.lookbook.page_frontmatter_defaults.data = {
    urls: {
      repo: "https://github.com/lookbook-hq/lookbook"
    }
  }

  # UI config

  config.lookbook.ui_status_bar = true
end
