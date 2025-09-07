Rails.application.configure do
  # While tests run files are not watched, reloading is not necessary.
  config.enable_reloading = false

  # Eager loading loads your entire application. When running a single test locally,
  # this is usually not necessary, and can slow down your test suite. However, it's
  # recommended that you enable it in continuous integration systems to ensure eager
  # loading is working properly before deploying your code.
  config.eager_load = ENV["CI"].present?

  # Configure public file server for tests with cache-control for performance.
  config.public_file_server.headers = {"cache-control" => "public, max-age=3600"}

  # Show full error reports.
  config.consider_all_requests_local = true
  config.cache_store = :null_store

  # Render exception templates for rescuable exceptions and raise for other exceptions.
  config.action_dispatch.show_exceptions = :rescuable

  # Disable request forgery protection in test environment.
  config.action_controller.allow_forgery_protection = false

  # Print deprecation notices to the stderr.
  config.active_support.deprecation = :stderr

  # Raise error when a before_action's only/except options reference missing actions.
  config.action_controller.raise_on_missing_callback_actions = true

  config.lookbook.project_name = "Lookbook test app"

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
