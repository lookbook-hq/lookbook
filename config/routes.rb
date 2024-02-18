Lookbook::Engine.routes.draw do
  root "inspector#index"

  get "/inspect/:preview", to: "inspector#preview", as: :preview_inspector
  get "/inspect/:preview/:scenario", to: "inspector#scenario", as: :scenario_inspector

  get "/scenarios/:preview/:scenario/render", to: "entities/scenarios#show", as: :rendered_scenario

  resources :updates, only: [:index]
end
