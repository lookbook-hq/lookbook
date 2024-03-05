module Lookbook
  module UI
    class Sidebar < BaseComponent
      delegate :previews_nav_label, :pages_nav_label, to: :config

      with_slot :previews_nav do |nav_tree|
        lookbook_nav_tree("previews-nav", nav_tree)
      end

      with_slot :pages_nav do |nav_tree|
        lookbook_nav_tree("pages-nav", nav_tree)
      end

      def filter_previews? = config.previews_nav_filter

      def filter_pages? = config.pages_nav_filter

      private

      def config = Lookbook.config
    end
  end
end
