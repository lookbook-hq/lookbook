module Lookbook
  class NavTreeItemComponent < Component
    delegate :path, :label, to: :node

    def initialize(node, **kwargs)
      @node = node

      super(**kwargs)
    end

    def children
      node.children.map { NavTreeItemComponent.new(_1) }
    end

    def display_type
      (node.type == :directory) ? :directory : :entity
    end

    def id
      "nt#{node.lookup_hash}"
    end

    def href
      node.url_path&.delete_suffix("/")
    end

    def active?(request)
      if href
        request.path.start_with?(href + "/") || request.path == href
      else
        request.query_parameters[:subject]&.start_with?(path.delete_prefix("/").tr("/", ":") + ":")
      end
    end

    protected

    attr_reader :node
  end
end
