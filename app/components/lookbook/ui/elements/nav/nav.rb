module Lookbook
  module UI
    class Nav < BaseComponent
      attr_reader :id, :tree, :placeholder

      def initialize(id:, tree:, filter: true, placeholder: "No items found", **kwargs)
        @id = id
        @tree = tree
        @filter = filter
        @placeholder = placeholder
      end

      def children
        tree.children.select(&:visible?)
      end

      def filter? = @filter && children.any?
    end
  end
end
