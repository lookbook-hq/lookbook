module Lookbook
  # Represents the component or view template partial
  # that is being rendered in a preview.
  #
  # @api public
  class RenderableEntity < Entity
    include LocatableEntity

    # @api private
    def initialize(identifier)
      @identifier = identifier
      @base_directories = Engine.component_paths
      @file_path = PathUtils.determine_full_path(component? ? "#{name}.rb" : identifier, @base_directories)
      unless @file_path && File.exist?(@file_path)
        raise LookbookError, "The render target #{@identifier} was not found."
      end
      @lookup_path = PathUtils.to_lookup_path(relative_file_path)
    end

    # @!group Identity

    # Parameter-safe entity name.
    #
    # @return [String]
    def name
      component? ? component_class.name.underscore : @identifier
    end

    # Entity type identifier.
    # Returns `:component` for components and
    # `:template` for view templates/partials.
    #
    # @return [Symbol] The entity type
    def type
      component? ? :component : :template
    end

    # @!endgroup

    # @!group Components

    # The associated component class (if the renderable is a component).
    #
    # @return [Class] The component class
    def component_class
      @identifier.constantize if component?
    end

    # Whether or not the renderable is a component without a template.
    #
    # @return [Boolean] True if no template is present
    def inline?
      component? ? template_file_path.present? : false
    end

    # Whether or not the renderable is a component
    # (as opposed to a view template/partial).
    #
    # @return [Boolean] True if component
    def component?
      @identifier.first.upcase == @identifier.first &&
        !@identifier.include?(".") &&
        !@identifier.include?("/")
    end

    # Whether or not the renderable is a view template/partial
    # (as opposed to a component).
    #
    # @return [Boolean] True if component
    def template?
      !component?
    end

    # @!endgroup

    # @!group Paths

    # Full path to the component template (if present)
    # or view template/partial.
    #
    # @return [Class] The component class
    def template_file_path
      component? ? Dir.glob("#{directory_path}/#{file_name(true)}.*.erb").first : file_path
    end

    # @!endgroup
  end
end
