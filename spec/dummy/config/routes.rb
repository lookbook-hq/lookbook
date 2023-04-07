# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"

  get "/blog", to: "blog#index"

  mount Lookbook::Engine, at: "/lookbook"
end
