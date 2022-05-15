Rails.application.routes.draw do
  # Defines the root path route ("/")
  # root "articles#index"

  mount Lookbook::Engine, at: "/lookbook"
end
