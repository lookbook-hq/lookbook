# if Lookbook::Engine.enabled?
Rails.application.routes.append do
  mount Lookbook::Engine => Lookbook::Engine.mount_path
end
# end
