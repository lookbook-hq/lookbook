if Lookbook::Engine.enabled? && Lookbook.config.preview_paths.any?
  paths_to_add = Lookbook.config.preview_paths - ActiveSupport::Dependencies.autoload_paths
  filtered_paths = paths_to_add.filter { |p| !Lookbook::Engine.component_paths.include?(p) }
  ActiveSupport::Dependencies.autoload_paths.concat(filtered_paths) if filtered_paths.any?
end
