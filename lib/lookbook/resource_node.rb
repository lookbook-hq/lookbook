module Lookbook
  class ResourceNode < Booklet::Node
    prop :entity, Booklet::Node

    permit_child_nodes ResourceNode

    def resource_type
      @entity.type.name.to_sym
    end

    def to_param
      case resource_type
      when :spec, :page, :folder
        @lookup_path ||= @entity.lookup_path(separator: ":") do |node|
          node.lookup_value unless node.root?
        end
      when :scenario
        @entity.lookup_value
      end
    end

    delegate_missing_to :@entity

    class << self
      def from(entity, children: [])
        resource = new(entity.ref.raw, entity:)
        resource.children = children.compact
        resource
      end
    end
  end
end
