Rails.application.routes.draw do
  root "application#index"

  mount Lookbook::Engine, at: "/lookbook"
end
