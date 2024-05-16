# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "development"

require "rubygems"
require "bundler"

Bundler.require :default

if ENV["RACK_ENV"] == "development"
  Bundler.require :development
end

if ENV["RACK_ENV"] == "development"
  use BetterErrors::Middleware
  BetterErrors.application_root = "test/demo"
end

require_relative "test/support/combustion"

run Combustion::Application
