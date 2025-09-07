require_relative "boot"

require "yard"
require "rails"
require "action_view/railtie"
require "rails/test_unit/railtie"
require "action_controller/railtie"

require "view_component"
require "lookbook"
require "phlex-rails"

module Dummy
  class Application < Rails::Application
    YARD::Logger.instance.level = YARD::Logger::ERROR

    Lookbook.add_tag(:customtag)

    config.load_defaults Rails::VERSION::STRING.to_f
    config.action_controller.default_url_options = {host: "localhost"}

    config.lookbook.project_name = "Lookbook dummy app"

    config.lookbook.listen = Rails.env.development?
    config.lookbook.using_view_component = true

    previews_path = "#{root}/previews/#{Rails.env.test? ? "test" : "dev"}"
    if config.view_component.key?(:previews)
      # ViewComponent >= v4.0 config style
      config.view_component.previews.paths << previews_path
    else
      # ViewComponent < v4.0 config style
      config.view_component.preview_paths << previews_path
    end

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
