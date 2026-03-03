Lookbook::Engine.routes.draw do
  root to: "start#show", as: :lookbook

  resources :collections, only: :show, param: :collection
  resources :scenarios, only: :show, param: :scenario
  resources :specs, only: :show, param: :spec
  resources :pages, only: :show, param: :page

  get "events", to: "sse#index", as: :events

  # TODO: routes for embeds
end
