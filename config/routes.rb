Lookbook::Engine.routes.draw do
  root to: "browser#index", as: :home

  mount Lookbook::Engine.websocket => Lookbook::Engine.cable.mount_path

  get "/preview/*path", to: "browser#preview", as: :preview
  get "/*path", to: "browser#show", as: :show
end
