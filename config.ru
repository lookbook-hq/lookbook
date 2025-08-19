# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "development"

require "rubygems"
require "bundler"

Bundler.require :default

case ENV["RAILS_ENV"]
when "development"
  Bundler.require :development
when "test"
  Bundler.require :test
end

require_relative "test/demo/config/application"

run Combustion::Application
