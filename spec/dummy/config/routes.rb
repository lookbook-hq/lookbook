# frozen_string_literal: true

Rails.application.routes.draw do
  mount Lookbook::Engine, at: "/lookbook"
end
