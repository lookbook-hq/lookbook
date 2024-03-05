module Lookbook
  module Pages
    class << self
      include Loggable
      include Updatable

      delegate :all, :updated_at, to: :store

      def load_all
        debug("pages: loading pages...")

        parser.parse do |page_entities|
          store.replace_all(page_entities)
          run_update_callbacks

          debug("pages: #{page_entities.size} pages loaded")
        end
      end

      def update(changes)
        debug("pages: updating pages...")

        # TODO: smart update - only reparse changed files
        parser.parse do |page_entities|
          store.replace_all(page_entities)
          run_update_callbacks

          debug("pages: #{page_entities.size} pages updated")
        end
      end

      def reloader
        Reloader.new(:pages, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load_all : update(changes)
        end
      end

      def page_paths
        @page_paths ||= Utils.normalize_paths(Lookbook.config.page_paths)
      end

      def watch_paths
        @watch_paths ||= [
          page_paths,
          Previews.watch_paths,
          Utils.normalize_paths(Lookbook.config.page_watch_paths)
        ].flatten.uniq
      end

      def watch_extensions
        ["rb", "html.*", Lookbook.config.page_watch_extensions].flatten.compact.uniq
      end

      private

      def store
        @store ||= EntityStore.new(PageEntity)
      end

      def parser
        @parser ||= PagesParser.new(page_paths)
      end
    end
  end
end
