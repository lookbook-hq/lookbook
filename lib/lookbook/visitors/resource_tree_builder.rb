# frozen_string_literal: true

module Lookbook
  class ResourceTreeBuilder < Booklet::Visitor
    visit Booklet::FolderNode do |node|
      child_resources = node.children.map { visit(_1) }.compact

      return nil if child_resources.none?

      folder = Folder.new(node.ref.raw, entity: node)
      folder.children = child_resources
      folder
    end

    visit Booklet::SpecNode do |node|
      child_resources = node.children.map { visit(_1) }.compact

      return nil if child_resources.none?

      spec = Spec.new(node.ref.raw, entity: node)
      spec.children = child_resources
      spec
    end

    visit Booklet::PageNode do |node|
      Page.new(node.ref.raw, entity: node)
    end

    visit Booklet::ScenarioNode do |node|
      Scenario.new(node.ref.raw, entity: node)
    end

    visit do |node|
      nil
    end
  end
end
