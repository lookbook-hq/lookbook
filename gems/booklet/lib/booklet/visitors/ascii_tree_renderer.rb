# frozen_string_literal: true

module Booklet
  class AsciiTreeRenderer < Visitor
    PIPE = "│"
    BRANCH = "├──"
    LEAF = "└──"
    SPACE = " "

    LABEL_PROC = proc { _1.respond_to?(:label) ? _1.label : _1.ref.raw }

    prop :indent, Integer, default: 0
    prop :to_label, _Proc?, :&, reader: :protected, default: -> { LABEL_PROC }

    after_initialize do
      @lines = []
      @prefix = +""
    end

    visit do |node|
      memo = @prefix

      if node.root?
        @lines << (SPACE * @indent) + to_label.call(node)
      else
        @lines << (SPACE * @indent) + @prefix + (node.last_sibling? ? LEAF : BRANCH) + SPACE + to_label.call(node)
        @prefix += (node.last_sibling? ? SPACE : PIPE) + (SPACE * BRANCH.size)
      end

      visit_each(node.children)
      @prefix = memo

      @lines.join("\n")
    end
  end
end
