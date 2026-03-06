# frozen_string_literal: true

require "prism"

module Booklet
  class RubyValidator < Visitor
    visit FolderNode do |node|
      visit_each(node.children)
      node
    end

    visit do |node|
      return node if node.path.extname != ".rb" || visited?(node)

      parse_result = Prism.parse_file(node.path.to_s)
      parse_result.errors.each do |error|
        node.add_error(error)
      end

      node
    end
  end
end
