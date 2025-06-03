Combustion.path = "spec/dummy"
Combustion.initialize! :action_controller, :action_view do
  config.autoloader = :zeitwerk

  ActiveSupport::Deprecation.silenced = true if ActiveSupport::Deprecation.respond_to?(:silenced=)
  ActiveSupport::Dependencies.autoload_paths << "#{root}/app"

  if config.view_component.preview_paths.present?
    config.view_component.preview_paths << "test/components/previews"
  elsif config.view_component.previews.paths.present?
    config.view_component.previews.paths << "test/components/previews"
  end

  config.lookbook.project_name = "Lookbook Test App"
  config.lookbook.listen = false
  config.lookbook.using_view_component = true

  config.action_controller.default_url_options = {host: "localhost"}

  Lookbook.add_tag(:customtag)

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
