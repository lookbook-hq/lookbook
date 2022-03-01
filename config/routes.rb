Lookbook::Engine.routes.draw do
  if Lookbook.config.auto_refresh
    mount Lookbook::Engine.websocket => Lookbook.config.cable.mount_path
  end

  root to: "app#index", as: :home

  get "/preview/*path", to: "app#preview", as: :preview
  get "/*path", to: "app#show", as: :show
end
