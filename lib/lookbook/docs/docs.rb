module Lookbook
  module Docs
    Pages.on_update { Docs.clear_cache }

    class << self
      include Loggable

      def nav_tree
        @nav_tree ||= begin
          debug("docs: building nav tree")
          EntityTree.new(Pages.select(&:visible?))
        end
      end

      def clear_cache
        debug("docs: clearing cache")

        @nav_tree = nil
      end
    end
  end
end
