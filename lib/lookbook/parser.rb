require "yard"

module Lookbook
  class Parser
    YARDOC_FILE_PATH = Rails.root.join("tmp/storage/.yardoc").to_s

    def initialize(paths)
      @paths = paths.map { |p| "#{p}/**/*.rb" }
      YARD::Registry.yardoc_file = YARDOC_FILE_PATH
    end

    def parse
      YARD::Registry.clear
      YARD::Registry.lock_for_writing do
        YARD.parse(@paths)
        YARD::Registry.save(false, YARDOC_FILE_PATH)
      end
    end

    def get_code_object(path)
      registry = YARD::RegistryStore.new
      registry.load!(YARDOC_FILE_PATH)
      registry.get(path)
    end

    class << self
      def define_tags
        YARD::Tags::Library.define_tag("Hidden status", :hidden)
        YARD::Tags::Library.define_tag("Label", :label)
      end
    end
  end
end
