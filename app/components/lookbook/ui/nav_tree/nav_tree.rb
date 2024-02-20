module Lookbook
  module UI
    class NavTree < BaseComponent
      delegate :children, to: :tree

      attr_reader :id, :tree

      def initialize(id:, tree:, **kwargs)
        @id = id
        @tree = tree
      end
    end
  end
end
