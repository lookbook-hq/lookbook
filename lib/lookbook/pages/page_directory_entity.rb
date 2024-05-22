module Lookbook
  class PageDirectoryEntity < Entity
    include EntityTreeNode

    attr_reader :path

    def initialize(path, default_priority: nil)
      @path = Pathname(path)
      @default_priority = default_priority
      @type = :directory
    end

    def lookup_path
      @lookup_path ||= PathPriorityPrefixesStripper.call(path)
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= lookup_path.split("/").pop
    end

    def children
      @children ||= Pages.tree.children_of(self).sort
    end

    def hidden?
      children.select(&:visible?).none?
    end

    def parent
      parent_lookup_path = File.dirname(lookup_path).delete_prefix(".")
      Pages.directories.find { _1.lookup_path == parent_lookup_path }
    end

    def priority
      @priority = begin
        pos = PriorityPrefixParser.call(File.basename(path)).first || @default_priority
        pos.to_i
      end
    end
  end
end
