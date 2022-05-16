# frozen_string_literal: true

require "rubygems"
require "bundler"

Bundler.require :default, :development

Combustion.path = "spec/dummy"
Combustion.initialize! :action_controller, :action_view do
  config.view_component.view_component_path = "../app/components"
end

run Combustion::Application
