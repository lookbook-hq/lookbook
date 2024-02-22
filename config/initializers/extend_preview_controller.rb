Rails.application.config.to_prepare do
  preview_controller = Lookbook.config.preview_controller.constantize
  unless preview_controller.include?(Lookbook::PreviewControllerActions)
    preview_controller.include(Lookbook::PreviewControllerActions)
  end
end
