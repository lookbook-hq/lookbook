require "yard"

module Lookbook
  class Parser

    YARDOC_FILE_PATH = Rails.root.join("tmp/storage/.yardoc").to_s

    def initialize(paths)
      @paths = paths.map { |p| "#{p}/**/*.rb" }
      registry.yardoc_file = YARDOC_FILE_PATH
    end

    def parse
      registry.clear
      YARD.parse(@paths)
      registry.save(false, YARDOC_FILE_PATH)
    end

    def find(path)
      registry.load!(YARDOC_FILE_PATH)
      registry.at(path)
    end

    def tags_for(path, tag_name = nil)
      code_object = find(path)
      code_object.tags(tag_name)
    end

    def define_tags
      YARD::Tags::Library.define_tag("Hidden status", :hidden)
    end

    private

    def registry
      YARD::Registry
    end

  end
end