# frozen_string_literal: true

module Lookbook
  class ResourcesBuilder < Booklet::Visitor
    RESOURCE_NODES = [
      Booklet::SpecNode,
      Booklet::DocumentNode,
      Booklet::ScenarioNode
    ]

    after_initialize do
      @resources = []
    end

    visit(*RESOURCE_NODES) do |node|
      resource = Lookbook::Resource.new(node)
      @resources.push(resource)
    end

    visit Booklet::FolderNode do |node|
      visit_each(node.children)
      @resources
    end
  end
end
