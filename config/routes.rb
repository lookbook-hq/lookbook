Lookbook::Engine.routes.draw do
  root to: "browser#index", as: :home

  mount Lookbook::Engine.websocket => Lookbook.cable.mount_path

  get "/*path", to: "browser#preview", as: :preview

end
