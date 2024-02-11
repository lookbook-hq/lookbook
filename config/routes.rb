Lookbook::Engine.routes.draw do
  root "inspector#index"

  resources :updates, only: [:index]
end
