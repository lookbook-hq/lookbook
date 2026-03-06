# frozen_string_literal: true

module Booklet
  class IssueAggregator < Visitor
    after_initialize do
      @issues = Issues.new
    end

    visit do |node|
      @issues.add(*node.issues)

      visit_each(node.children)
      node.root? ? @issues : node
    end
  end
end
