Rails.application.routes.draw do
  root "dummy#index"

  get "/blog", to: "blog#index"

  mount Lookbook::Engine => "/lookbook"
end
