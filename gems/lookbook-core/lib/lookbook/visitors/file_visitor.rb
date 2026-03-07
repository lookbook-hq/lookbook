# frozen_string_literal: true

module Lookbook
  class FileVisitor < Visitor
    visit FolderNode do |node|
      visit_each(node.children)
      node
    end
  end
end
