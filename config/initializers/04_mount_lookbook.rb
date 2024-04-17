Rails.application.routes.append do
  mount Lookbook::Engine => Lookbook::Engine.mount_path
end
