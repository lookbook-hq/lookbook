module Lookbook
  class PreviewGroup
    include Taggable

    attr_reader :name, :examples

    def initialize(name, preview, examples)
      @name = name
      @preview = preview
      @examples = examples
    end

    def id
      path.underscore.tr("/", "-").tr("_", "-")
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
      [].tr("/", "-")
    end

    def hidden?
      false
    end

    def matchers
      [@preview.label, label].map { |m| m.gsub(/\s/, "").downcase }
    end

    def hierarchy_depth
      @preview.lookbook_hierarchy_depth + 1
    end
  end
end
