Rails.application.routes.draw do
  root "home#show"

  mount Lookbook::Engine, at: "/lookbook"
end
