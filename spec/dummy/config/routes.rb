# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  mount Lookbook::Engine, at: "/lookbook"
end
