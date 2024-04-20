module Lookbook
  module UI
    class Nav < BaseComponent
      attr_reader :id, :tree

      def initialize(id:, tree:, filter: true, **kwargs)
        @id = id
        @tree = tree
        @filter = filter
      end

      def children
        tree.children.select(&:visible?)
      end

      def filter? = @filter
    end
  end
end
