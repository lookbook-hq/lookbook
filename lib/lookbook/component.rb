module Lookbook
  class Component < Entity
    attr_accessor :name

    def initialize(name)
      @name = name
      super(path)
    end

    def path
      name.underscore
    end

    def full_path
      Pathname.new("#{Lookbook.config.components_path}/#{path}.rb")
    end

    def dir_path
      full_path.dirname
    end

    def template_path
      Dir.glob("#{Lookbook.config.components_path}/#{path}.*.erb").first
    end

    def inline?
      template_path.present?
    end
  end
end
