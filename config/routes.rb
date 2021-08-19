Lookbook::Engine.routes.draw do
  mount Lookbook::Engine.websocket => Lookbook::Engine.cable.mount_path

  root to: "browser#index", as: :home

  get "/preview/*path", to: "browser#preview", as: :preview
  get "/*path", to: "browser#show", as: :show
end
