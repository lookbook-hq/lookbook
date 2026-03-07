# frozen_string_literal: true

require "herb"

module Lookbook::Core
  class HerbValidator < Visitor
    visit FolderNode do |node|
      visit_each(node.children)
      node
    end

    visit do |node|
      return node unless /.*\.(html\.erb|herb)$/.match?(node.path.extname) && !visited?(node)

      parse_result = Herb.parse_file(node.path.to_s)
      parse_result.warnings.each { node.add_warning(_1) }
      parse_result.errors.each { node.add_error(_1) }

      node
    end
  end
end
