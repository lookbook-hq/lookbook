Lookbook::Engine.routes.draw do
  root "inspector#index"

  resources :inspector, path: "inspect", only: %i[index show]

  resources :updates, only: [:index]
end
