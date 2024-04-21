module Lookbook
  class PreviewDirectoryEntity < Entity
    include EntityTreeNode

    attr_reader :lookup_path

    def initialize(lookup_path, default_priority: nil)
      @lookup_path = lookup_path
      @default_priority = default_priority
      @type = :directory
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= lookup_path.split("/").pop
    end

    def children
      @children ||= Previews.tree.children_of(self).sort
    end

    def hidden?
      children.select(&:visible?).none?
    end

    def parent
      parent_lookup_path = File.dirname(lookup_path).delete_prefix(".")
      Previews.directories.find { _1.lookup_path == parent_lookup_path }
    end
  end
end
