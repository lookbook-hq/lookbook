module Lookbook
  module Previews
    class << self
      include Loggable

      delegate_missing_to :store

      def load_all
        debug("previews: loading previews...")

        parser.parse do |preview_entities|
          store.replace_all(preview_entities)
          Inspector.clear_cache

          debug("previews: #{preview_entities.size} previews loaded")
        end
      end

      def update(changes)
        debug("previews: updating previews...")

        # Remove deleted or updated previews from the store
        tainted_paths = [changes.removed, changes.modified].flatten
        tainted_entities = tainted_paths.map do |path|
          store.find { _1.preview_file_path.to_s == path }
        end
        store.remove(*tainted_entities)

        # Parse modified or newly added preview files and add into store
        parser_paths = [changes.modified, changes.added].flatten
        parser.parse(parser_paths) do |preview_entities|
          store.add(*preview_entities)
          Inspector.clear_cache

          debug("previews: #{changes.removed.size} removed, #{changes.modified.size} updated, #{changes.added.size} added")
        end
      end

      def reloader
        Reloader.new(:previews, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load_all : update(changes)
        end
      end

      def on_update(&block)
        update_callbacks << block if block
      end

      def preview_class?(klass)
        if (defined?(ViewComponent) && klass.ancestors.include?(ViewComponent::Preview)) ||
            klass.ancestors.include?(Lookbook::Preview) ||
            klass.ancestors.include?(::ActionMailer::Preview)
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
        @preview_controller ||= begin
          preview_controller = Lookbook.config.preview_controller.constantize
          unless preview_controller.include?(Lookbook::PreviewControllerActions)
            preview_controller.include(Lookbook::PreviewControllerActions)
          end
          preview_controller
        end
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
          # log_level: Lookbook.logger.level,
          tags: Lookbook.config.preview_tags
        )
      end
    end
  end
end
