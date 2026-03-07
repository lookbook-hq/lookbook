# frozen_string_literal: true

module Lookbook::Rails
  class ResourceTreeBuilder < Lookbook::Visitor
    visit Lookbook::FolderNode do |node|
      child_resources = node.children.map { visit(_1) }.compact

      return nil if child_resources.none?

      folder = Folder.new(entity: node)
      folder.children = child_resources
      folder
    end

    visit Lookbook::SpecNode do |node|
      child_resources = node.children.map { visit(_1) }.compact

      return nil if child_resources.none?

      spec = Spec.new(entity: node)
      spec.children = child_resources
      spec
    end

    visit Lookbook::PageNode do |node|
      Page.new(entity: node)
    end

    visit Lookbook::ScenarioNode do |node|
      Scenario.new(entity: node)
    end

    visit do |node|
      nil
    end
  end
end
