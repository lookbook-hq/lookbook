Rails.application.routes.append do
  unless Rails.application.config.lookbook.mount_path.nil?
    mount Lookbook::Engine => Rails.application.config.lookbook.mount_path
  end
end
