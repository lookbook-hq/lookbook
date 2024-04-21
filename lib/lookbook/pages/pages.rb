module Lookbook
  module Pages
    class << self
      include Loggable

      delegate_missing_to :store

      def load
        debug("pages: loading pages...")

        parser.parse do |page_entities|
          store.replace_all(page_entities)
          clear_cache

          debug("pages: #{page_entities.size} pages loaded")
        end
      end

      def tree
        @tree ||= begin
          debug("pages: building tree")
          EntityTree.new(store.all)
        end
      end

      def directories
        @directories ||= begin
          directory_paths = store.all.map(&:parent_lookup_path).compact.uniq.each do |path|
            current_path = ""
            path.split("/").map { "#{current_path}/#{_1}".delete_prefix("/") }
          end
          sorted_paths = directory_paths.flatten.uniq.sort
          sorted_paths.map.with_index(1) { PageDirectoryEntity.new(_1, default_priority: _2) }
        end
      end

      def reloader
        Reloader.new(:pages, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load : update(changes)
        end
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
        [Lookbook.config.page_extensions, Lookbook.config.page_watch_extensions].flatten.compact.uniq
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

      def clear_cache
        debug("pages: clearing cache")

        @tree = nil
        @directories = nil
      end

      def update(changes)
        debug("pages: updating pages...")

        # Remove deleted or updated pages from the store
        tainted_paths = [changes.removed, changes.modified].flatten
        tainted_entities = tainted_paths.map do |path|
          store.find { _1.file_path.to_s == path }
        end
        store.remove(*tainted_entities.compact)

        # Parse modified or newly added pages and add into store
        parser_paths = [changes.modified, changes.added].flatten
        parser.parse(parser_paths) do |page_entities|
          store.add(*page_entities)
          clear_cache

          debug("pages: #{changes.removed.size} removed, #{changes.modified.size} updated, #{changes.added.size} added")
        end
      end

      def store
        @store ||= EntityStore.new(PageEntity)
      end
    end
  end
end
