# frozen_string_literal: true

Rails.application.routes.draw do
  root "demo#index"

  Lookbook::Engine.mount("/lookbook")
end
