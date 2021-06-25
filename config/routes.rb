Lookbook::Engine.routes.draw do
  root to: "browser#index", as: :home
  get "/*path", to: "browser#preview", as: :preview
end