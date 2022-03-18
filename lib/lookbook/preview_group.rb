module Lookbook
  class PreviewGroup
    include Taggable
    include Utils

    attr_reader :name, :examples

    def initialize(name, preview, examples)
      @name = name
      @preview = preview
      @examples = examples
    end

    def id
      generate_id(url_path)
    end

    def path
      "#{@preview.lookbook_path}/#{name}"
    end

    def label
      name.titleize
    end

    def type
      :group
    end

    def params
      examples.map(&:params).flatten.uniq { |param| param[:name] }
    end

    def display_params
      {}
    end

    def hidden?
      false
    end

    def matchers
      normalize_matchers(@preview.label, label)
    end

    def hierarchy_depth
      @preview.lookbook_hierarchy_depth + 1
    end

    alias_method :position, :lookbook_position
    alias_method :url_path, :path
  end
end
