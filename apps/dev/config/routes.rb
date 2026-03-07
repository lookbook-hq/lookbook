Rails.application.routes.draw do
  root "home#show"

  mount Lookbook::Rails::Engine, at: "/lookbook"
end
