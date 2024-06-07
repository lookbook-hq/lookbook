module Lookbook
  class PageDirectoryEntity < DirectoryEntity
    def children
      @children ||= begin
        child_nodes = Pages.tree.children_of(self).sort
        ListResolver.call(config.fetch(:children, "*"), child_nodes.map(&:name)) do |name|
          child_nodes.find { _1.name == name }
        end
      end
    end

    def parent
      parent_lookup_path = File.dirname(lookup_path).delete_prefix(".")
      Pages.directories.find_or_add(parent_lookup_path, File.dirname(path)) if parent_lookup_path.present?
    end

    def priority
      @priority = begin
        pos = PriorityPrefixParser.call(File.basename(path)).first || Entity::DEFAULT_PRIORITY
        pos.to_i
      end
    end
  end
end
