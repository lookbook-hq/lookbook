# frozen_string_literal: true

module Lookbook
  class ResourceTreeBuilder < Booklet::Visitor
    RESOURCE_NODES = [
      Booklet::FolderNode,
      Booklet::SpecNode,
      Booklet::PageNode,
      Booklet::ScenarioNode
    ]

    visit do |node|
      case node

      when Booklet::FolderNode, Booklet::SpecNode
        return nil if is_empty?(node)

        ResourceNode.from(node, children: node.children.map { visit(_1) })
      when Booklet::ScenarioNode, Booklet::PageNode
        ResourceNode.from(node)
      end
    end

    protected def is_empty?(node)
      node.children.filter { _1.class.in?(RESOURCE_NODES) }.empty?
    end
  end
end
