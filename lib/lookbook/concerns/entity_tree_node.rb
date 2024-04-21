module Lookbook
  module EntityTreeNode
    extend ActiveSupport::Concern

    def ancestors
      ancestors = []
      current_parent = parent
      while current_parent
        ancestors.unshift current_parent
        current_parent = current_parent.parent
      end
      ancestors
    end

    def parent_lookup_path
      File.dirname(lookup_path).delete_prefix(".")
    end

    def addressable?
      respond_to?(:url_path)
    end

    def depth
      @depth ||= lookup_path.split("/").size
    end

    def search_terms
      [label.downcase, *parent&.search_terms].flatten
    end

    def <=>(other)
      [priority, label] <=> [other.priority, other.label]
    end

    def children = []

    def parent = nil

    def root? = false
  end
end
