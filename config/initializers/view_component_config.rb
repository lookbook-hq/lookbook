Rails.application.config.after_initialize do
  if Gem::Specification.find_all_by_name("view_component").present?
    vc_config = Rails.application.config.view_component

    Lookbook.config.preview_paths += vc_config.preview_paths

    if vc_config.preview_controller != ViewComponent::Config.defaults.preview_controller && Lookbook.config.preview_controller == Lookbook::Config.defaults.preview_controller
      Lookbook.config.preview_controller = vc_config.preview_controller
    elsif Lookbook.config.preview_controller != Lookbook::Config.defaults.preview_controller
      vc_config.preview_controller = Lookbook.config.preview_controller
    end

    if Lookbook.config.preview_layout.nil? || vc_config.default_preview_layout.present?
      Lookbook.config.preview_layout = vc_config.default_preview_layout
    else
      vc_config.default_preview_layout = Lookbook.config.preview_layout
    end

    if vc_config.view_component_path.present?
      Lookbook.config.component_paths << vc_config.view_component_path
    end
  end
end
