# frozen_string_literal: true

Rails.application.routes.draw do
  root "demo#index"

  mount Lookbook::Engine => "/lookbook"
end
