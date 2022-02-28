Lookbook::Engine.routes.draw do
  if Lookbook.config.auto_refresh
    mount Lookbook::Engine.websocket => Lookbook.config.cable.mount_path
  end

  root to: "application#index", as: :home

  get "/preview/*path", to: "previews#preview", as: :preview
  get "/*path", to: "previews#show", as: :show
end
