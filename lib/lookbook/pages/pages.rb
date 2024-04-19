module Lookbook
  module Pages
    class << self
      include Loggable

      delegate :all, :updated_at, to: :store
      delegate_missing_to :all

      def load_all
        debug("pages: loading pages...")

        parser.parse do |page_entities|
          store.replace_all(page_entities)
          Docs.clear_cache

          debug("pages: #{page_entities.size} pages loaded")
        end
      end

      def update(changes)
        debug("pages: updating pages...")

        # TODO: smart update - only reparse changed files
        parser.parse do |page_entities|
          store.replace_all(page_entities)
          Docs.clear_cache

          debug("pages: #{page_entities.size} pages updated")
        end
      end

      def reloader
        Reloader.new(:pages, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load_all : update(changes)
        end
      end

      def on_update(&block)
        update_callbacks << block if block
      end

      def page_controller
        Lookbook.config.page_controller.constantize
      end

      def page_paths
        @page_paths ||= Utils.normalize_paths(Lookbook.config.page_paths)
      end

      def watch_paths
        @watch_paths ||= [
          page_paths,
          Utils.normalize_paths(Lookbook.config.page_watch_paths)
        ].flatten.uniq
      end

      def watch_extensions
        ["rb", "html.*", Lookbook.config.page_watch_extensions].flatten.compact.uniq
      end

      def to_lookup_path(page_path)
        path = page_path.to_s.downcase

        directory_path = File.dirname(path)
        directory_path = nil if directory_path.start_with?(".")

        file_name = File.basename(path).split(".").first

        segments = [*directory_path&.split("/"), file_name].compact
        segments.map! do |segment|
          PriorityPrefixParser.call(segment).last.tr("-", "_")
        end

        Utils.to_path(segments)
      end

      def parser
        @parser ||= PagesParser.new(page_paths)
      end

      private

      def store
        @store ||= EntityStore.new(PageEntity)
      end
    end
  end
end
