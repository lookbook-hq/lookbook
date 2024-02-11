module Lookbook
  module Previews
    class << self
      include Loggable

      def all
        store.to_collection
      end

      def load_all
        debug("previews: loading previews...")

        parser.parse do |preview_entities|
          store.replace_all(preview_entities)

          debug("previews: #{preview_entities.size} previews loaded")
        end
      end

      def update(changes)
        debug("previews: updating previews...")

        # TODO: smart update - only reparse changed files
        parser.parse do |preview_entities|
          store.replace_all(preview_entities)

          debug("previews: #{preview_entities.size} previews updated")
        end
      end

      def reloader
        Reloader.new(:previews, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load_all : update(changes)
          Previews.mark_updated
        end
      end

      def preview_class?(klass)
        if (defined?(ViewComponent) && klass.ancestors.include?(ViewComponent::Preview)) || klass.ancestors.include?(Lookbook::Preview)
          !klass.respond_to?(:abstract_class) || klass.abstract_class != true
        end
      end

      def source_paths
        @source_paths ||= Lookbook.config.preview_paths.select { |p| Dir.exist?(p) }.map(&:to_s)
      end

      def watch_paths
        @watch_paths ||= begin
          paths = [*source_paths].uniq
          Utils.normalize_paths(paths)
        end
      end

      def watch_extensions
        Lookbook.config.listen_extensions
      end

      def updated_at
        @updated_at ||= mark_updated
      end

      def mark_updated
        @updated_at = Utils.current_timestamp_milliseconds
      end

      private

      def store
        @store ||= EntityStore.new(PreviewEntity, PreviewCollection)
      end

      def parser
        @parser ||= PreviewsParser.new(source_paths, source_parser)
      end

      def source_parser
        @source_parser ||= SourceParser.new
      end
    end
  end
end
