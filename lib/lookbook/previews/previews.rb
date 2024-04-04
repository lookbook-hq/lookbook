module Lookbook
  module Previews
    class << self
      include Loggable
      include Updatable

      delegate :all, :updated_at, to: :store
      delegate :find, to: :all

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

      def reloader
        Reloader.new(:previews, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load_all : update(changes)
        end
      end

      def preview_class?(klass)
        if (defined?(ViewComponent) && klass.ancestors.include?(ViewComponent::Preview)) ||
            klass.ancestors.include?(Lookbook::Preview) ||
            klass.ancestors.include?(ActionMailer::Preview)
          !klass.respond_to?(:abstract_class) || klass.abstract_class != true
        end
      end

      def preview_paths
        @preview_paths ||= Utils.normalize_paths(Lookbook.config.preview_paths)
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
        ["rb", "html.*", Lookbook.config.preview_watch_extensions].flatten.compact.uniq
      end

      def preview_controller
        Lookbook.config.preview_controller.constantize
      end

      def system_templates
        ["view_components/preview", Lookbook.config.preview_template]
      end

      def parser
        @parser ||= PreviewsParser.new(preview_paths, source_parser)
      end

      private

      def store
        @store ||= EntityStore.new(PreviewEntity)
      end

      def source_parser
        @source_parser ||= SourceParser.new(
          log_level: Lookbook.logger.level,
          tags: Lookbook.config.preview_tags
        )
      end
    end
  end
end
