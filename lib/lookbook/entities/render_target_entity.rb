module Lookbook
  # Represents the component or view template partial
  # that is being rendered by in a preview.
  #
  # @ignore methods
  # @api public
  class RenderTargetEntity < Entity
    include LocatableEntity

    def initialize(file_path)
      @file_path = "#{Engine.component_paths.first}/#{file_path}.rb"
      @base_directories = Engine.component_paths
      @lookup_path = PathUtils.to_lookup_path(relative_file_path)
    end
  end
end
