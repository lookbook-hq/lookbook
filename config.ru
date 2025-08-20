# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "development"

require "rubygems"
require "bundler"

Bundler.require :default, :development

require_relative "test/dummy/config/application"

run Combustion::Application
