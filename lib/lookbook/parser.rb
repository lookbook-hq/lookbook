require "yard"

module Lookbook
  class Parser
    attr_reader :registry_path
    def initialize(paths, registry_path)
      @paths = paths.map { |p| "#{p}/**/*preview.rb" }
      @registry_path = registry_path.to_s
      YARD::Registry.yardoc_file = registry_path
    end

    def parse
      YARD::Registry.clear
      YARD::Registry.lock_for_writing do
        YARD.parse(@paths)
        YARD::Registry.save(false, registry_path)
      end
    end

    def get_code_object(path)
      registry = YARD::RegistryStore.new
      registry.load!(registry_path)
      registry.get(path)
    end

    class << self
      def define_tags
        YARD::Tags::Library.define_tag("Hidden status", :hidden)
        YARD::Tags::Library.define_tag("Design", :design)
        YARD::Tags::Library.define_tag("Label", :label)
        YARD::Tags::Library.define_tag("Display", :display)
        YARD::Tags::Library.define_tag("Position", :position)
        YARD::Tags::Library.define_tag("ID", :id)
      end
    end
  end
end
