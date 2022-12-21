module Lookbook
  # Represents a component
  #
  # @ignore methods
  # @api public
  class ComponentEntity < Entity
    include LocatableEntity

    attr_reader :component_class

    def initialize(component_class)
      @component_class = component_class
      @file_path = "#{Engine.component_paths.first}/#{name.underscore}.rb"
      @base_directories = Engine.component_paths
      @lookup_path = PathUtils.to_lookup_path(relative_file_path)
    end

    def name
      component_class.name
    end

    def template_file_path
      Dir.glob("#{directory_path}/#{file_name(true)}.*.erb").first
    end

    def inline?
      template_file_path.present?
    end
  end
end
