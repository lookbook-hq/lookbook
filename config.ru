# frozen_string_literal: true

require "rubygems"
require "bundler"
require "phlex-rails"

Bundler.require :default, :development

require_relative "spec/support/combustion"

run Combustion::Application
