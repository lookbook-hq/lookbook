module Lookbook
  # Represents the component being rendered in a preview.
  #
  # A subclass of RenderTargetEntity
  #
  # @ignore methods
  # @api public
  class ComponentEntity < RenderTargetEntity
    attr_reader :component_class

    def initialize(component_class)
      @component_class = component_class
      super(name)
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
