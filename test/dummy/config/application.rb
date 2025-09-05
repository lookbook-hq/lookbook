require_relative "boot"

require "rails"
require "propshaft"
require "action_view/railtie"
require "rails/test_unit/railtie"
require "action_controller/railtie"

require "view_component"
require "lookbook"
require "phlex-rails"

module Dummy
  class Application < Rails::Application
    config.load_defaults Rails::VERSION::STRING.to_f

    config.lookbook.project_name = "Lookbook dummy app"

    config.lookbook.listen = Rails.env.development?
    config.lookbook.using_view_component = true

    if config.view_component.key?(:previews)
      config.view_component.previews.paths << "#{root}/previews"
    else
      config.view_component.preview_paths << "#{root}/previews"
    end

    config.action_controller.default_url_options = {host: "localhost"}

    # Regression case with exception:
    #
    #   "Cannot transliterate strings with ASCII-8BIT encoding (ArgumentError)"
    #
    # In order to simulate this bug we need to force ASCII for filenames (when we
    # pass an ASCII string to Ruby's Dir[] method it returns filenames as ASCII,
    # and in some environments, if the code is not explicitly forcing UTF-8 this
    # will be the case for regular strings ion config files.
    #
    # Obs.: At this point here the Lookbook::Engine is already loaded and it
    #   memoizes the page_paths, so it DOES NOT WORK by adding the
    #   config.lookbook.page_paths here
    Lookbook::Engine.page_paths.each do
      _1.force_encoding(Encoding::ASCII_8BIT)
    end
  end
end
