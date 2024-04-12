module Lookbook
  module UI
    class NavTree < BaseComponent
      delegate :children, to: :tree

      attr_reader :id, :tree

      def initialize(id:, tree:, filter: true, **kwargs)
        @id = id
        @tree = tree
        @filter = filter
      end

      def filter? = @filter
    end
  end
end
