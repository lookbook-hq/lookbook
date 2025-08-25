# frozen_string_literal: true

Rails.application.routes.draw do
  root "dummy#index"

  mount Lookbook::Engine, at: "/lookbook"
end
