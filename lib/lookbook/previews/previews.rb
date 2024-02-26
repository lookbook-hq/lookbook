module Lookbook
  module Previews
    class << self
      include Loggable

      delegate :all, to: :store

      def load_all
        debug("previews: loading previews...")

        parser.parse do |preview_entities|
          store.replace_all(preview_entities)
          run_update_callbacks

          debug("previews: #{preview_entities.size} previews loaded")
        end
      end

      def update(changes)
        debug("previews: updating previews...")

        # TODO: smart update - only reparse changed files
        parser.parse do |preview_entities|
          store.replace_all(preview_entities)
          run_update_callbacks

          debug("previews: #{preview_entities.size} previews updated")
        end
      end

      def on_update(&block)
        update_callbacks << block if block
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
        @preview_paths ||= Utils.normalize_paths(Lookbook.config.preview_paths.uniq)
      end

      def component_paths
        @component_paths ||= [
          Utils.normalize_paths(Lookbook.config.component_paths),
          Engine.view_paths,
          Engine.host_app_path
        ].flatten.uniq
      end

      def watch_paths
        @watch_paths ||= [
          preview_paths,
          component_paths,
          Engine.view_paths,
          Utils.normalize_paths(Lookbook.config.preview_watch_paths)
        ].flatten.uniq
      end

      def watch_extensions
        ["rb", "html.*", Lookbook.config.preview_watch_extensions].flatten.uniq
      end

      def preview_controller
        Lookbook.config.preview_controller.constantize
      end

      delegate :updated_at, to: :store

      private

      def run_update_callbacks
        update_callbacks.each { _1.call }
      end

      def update_callbacks
        @update_callbacks ||= []
      end

      def store
        @store ||= EntityStore.new(PreviewEntity)
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
