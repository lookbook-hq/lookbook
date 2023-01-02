module Lookbook
  # Represents the component or view template partial
  # that is being rendered in a preview.
  #
  # @ignore methods
  # @api public
  class ComponentEntity < Entity
    include LocatableEntity

    def initialize(identifier)
      @identifier = identifier
      @base_directories = Engine.component_paths
      @file_path = PathUtils.determine_full_path(component? ? "#{name}.rb" : identifier, @base_directories)
      unless @file_path && File.exist?(@file_path)
        raise LookbookError, "The render target #{@identifier} was not found."
      end
      @lookup_path = PathUtils.to_lookup_path(relative_file_path)
    end

    def component_class
      @identifier.constantize if component?
    end

    def name
      component? ? component_class.name.underscore : @identifier
    end

    def template_file_path
      component? ? Dir.glob("#{directory_path}/#{file_name(true)}.*.erb").first : file_path
    end

    def inline?
      component? ? template_file_path.present? : false
    end

    def component?
      @identifier.first.upcase == @identifier.first &&
        !@identifier.include?(".") &&
        !@identifier.include?("/")
    end

    def template?
      !component?
    end

    def type
      component? ? :component : :template
    end
  end
end
