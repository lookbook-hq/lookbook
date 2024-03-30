# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "development"

require "rubygems"
require "bundler"

Bundler.require :default, :development

if ENV["RACK_ENV"] == "development"
  use BetterErrors::Middleware
  BetterErrors.application_root = "test/demo"
end

Combustion.path = "test/demo"
Combustion.initialize! :action_controller, :action_view, :sprockets

run Combustion::Application
