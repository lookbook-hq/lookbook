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

    def siblings
      parent.children.filter { _1.lookup_path == lookup_path }
    end

    def index
      parent.children.index(self)
    end

    def last?
      self == parent.children.last
    end

    def first?
      self == parent.children.first
    end

    def next
    end

    def previous
    end

    def parent_lookup_path
      File.dirname(lookup_path).delete_prefix(".")
    end

    def navigable?
      url_path.present?
    end

    def depth
      @depth ||= lookup_path.split("/").size
    end

    def search_terms
      [label.downcase, *parent&.search_terms].flatten
    end

    def children = []

    def parent = nil

    def root? = false
  end
end
