Rails.application.routes.draw do
  root "dummy#index"

  mount Lookbook::Engine => "/lookbook"
end
