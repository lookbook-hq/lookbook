# frozen_string_literal: true

module Lookbook
  module Analyzer
    class << self
      def analyze(path, loader: Lookbook.loader, visitors: Lookbook.visitors)
        path = Pathname(path).expand_path

        EntityTree.new(path, loader:, visitors:).load!
      end

      def update(tree)
        loader = tree.loader.with_registry(tree)

        EntityTree.new(tree.path, loader:, visitors: tree.visitors).load!
      end
    end
  end
end
