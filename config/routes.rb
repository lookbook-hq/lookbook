Lookbook::Engine.routes.draw do
  root "inspector#index"

  # resources :inspector, path: "inspect", param: "preview", only: %i[index show] do
  #   get ":scenario", to: "inspector#scenario", on: :member, as: "scenario"
  # end

  get "/inspect/:preview", to: "inspector#preview", as: :preview_inspector
  get "/inspect/:preview/:scenario", to: "inspector#scenario", as: :scenario_inspector

  resources :updates, only: [:index]
end
