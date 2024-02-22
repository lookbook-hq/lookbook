module Lookbook
  module Previews
    class << self
      include Loggable

      delegate_missing_to :all

      def all
        store.to_collection
      end

      def to_tree
        store.to_tree
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
        end
      end

      def preview_class?(klass)
        if (defined?(ViewComponent) && klass.ancestors.include?(ViewComponent::Preview)) || klass.ancestors.include?(Lookbook::Preview)
          !klass.respond_to?(:abstract_class) || klass.abstract_class != true
        end
      end

      def preview_paths
        @preview_paths ||= Lookbook.config.preview_paths.select { |p| Dir.exist?(p) }.map(&:to_s)
      end

      def watch_paths
        @watch_paths ||= begin
          paths = [*preview_paths, *Engine.view_paths].uniq
          Utils.normalize_paths(paths)
        end
      end

      def watch_extensions
        ["rb", "html.*", *Lookbook.config.preview_watch_extensions].uniq
      end

      def preview_controller
        Lookbook.config.preview_controller.constantize
      end

      def updated_at
        store.updated_at
      end

      private

      def store
        @store ||= EntityStore.new(PreviewEntity, PreviewCollection)
      end

      def parser
        @parser ||= PreviewsParser.new(preview_paths, source_parser)
      end

      def source_parser
        @source_parser ||= SourceParser.new(log_level: Lookbook.logger.level)
      end
    end
  end
end
