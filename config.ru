# frozen_string_literal: true

require "rubygems"
require "bundler"

Bundler.require :default, :development

require_relative "spec/support/combustion"

run Combustion::Application
