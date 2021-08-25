Lookbook::Engine.routes.draw do
  if Lookbook.config.auto_refresh
    mount Lookbook::Engine.websocket => Lookbook::Engine.cable.mount_path
  end

  root to: "browser#index", as: :home

  get "/preview/*path", to: "browser#preview", as: :preview
  get "/*path", to: "browser#show", as: :show
end
