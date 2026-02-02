require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Make code changes take effect immediately without server restart.
  config.enable_reloading = true

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable server timing.
  config.server_timing = true

  # Change to :null_store to avoid any caching.
  config.cache_store = :memory_store

  # Annotate rendered view with file names.
  config.action_view.annotate_rendered_view_with_filenames = true

  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # Reload Lookbook source files when developing/testing with the dummy app

  gem_path = Pathname.new(Gem.loaded_specs["lookbook"].full_gem_path).join("lib")

  file_watcher = ActiveSupport::FileUpdateChecker.new(gem_path.glob("**/*")) do
    Lookbook::Loader.reload
  end

  Rails.application.reloaders << Class.new do
    def initialize(file_watcher)
      @file_watcher = file_watcher
    end

    def updated?
      @file_watcher.execute_if_updated
    end
  end.new(file_watcher)
end
