Rails.application.routes.append do
  if Lookbook.config.auto_mount
    mount Lookbook::Engine => Lookbook::Engine.mount_path
  end
end
