module Lookbook
  class PreviewDirectoryEntity < DirectoryEntity
    def children
      @children ||= begin
        child_nodes = Previews.tree.children_of(self).sort
        ListResolver.call(config.fetch(:children, "*"), child_nodes.map(&:name)) do |name|
          child_nodes.find { _1.name == name }
        end
      end
    end

    def parent
      parent_lookup_path = File.dirname(lookup_path).delete_prefix(".")
      Previews.directories.find_or_add(parent_lookup_path, File.dirname(path)) if parent_lookup_path.present?
    end
  end
end
