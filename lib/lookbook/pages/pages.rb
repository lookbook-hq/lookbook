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

      def resolve_page(identifier)
        return identifier if identifier.is_a?(PageEntity)

        if identifier.is_a?(String) || identifier.is_a?(Symbol)
          identifier = identifier.to_s
          store.find { [_1.id, _1.uuid].include?(identifier.to_s) }
        else
          raise ArgumentError, "Invalid page identifier"
        end
      end

      def tree
        @tree ||= begin
          debug("pages: building tree")
          EntityTree.new(store.all)
        end
      end

      def to_data(format: "list")
        raise ArgumentError, "Invalid format '#{format}'" unless ["list", "tree"].include?(format)

        (format == "tree") ? tree.to_data : store.to_data
      end

      def to_json(...)
        Utils.deep_camelize_keys(to_data(...))
      end

      def directories
        @directories ||= begin
          dirnames = store.all.map { _1.relative_file_path.dirname.to_s.delete_prefix(".") }.compact_blank.uniq
          directory_paths = dirnames.flat_map do |path|
            current_path = ""
            path.split("/").map do |segment|
              current_path = "#{current_path}/#{segment}".delete_prefix("/")
            end
          end
          sorted_paths = directory_paths.uniq.sort
          sorted_paths.map.with_index(1) { PageDirectoryEntity.new(_1, default_priority: _2) }
        end
      end

      def reloader
        Reloader.new(:pages, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load : update(changes)
        end
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
        @store ||= EntityStore.new
      end
    end
  end
end
