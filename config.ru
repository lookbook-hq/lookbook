# frozen_string_literal: true

require "rubygems"
require "bundler"

Bundler.require :default, :development

require_relative "test/support/combustion"

run Combustion::Application
