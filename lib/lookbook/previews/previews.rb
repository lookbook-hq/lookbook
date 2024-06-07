module Lookbook
  module Previews
    class << self
      include Loggable

      delegate_missing_to :store

      def load
        debug("previews: loading previews...")

        parser.parse do |preview_entities|
          store.replace_all(preview_entities)
          clear_cache

          debug("previews: #{preview_entities.size} previews loaded")
        end
      end

      def resolve_preview(identifier)
        return identifier if identifier.is_a?(PreviewEntity)

        if identifier.is_a?(Class)
          store.find { _1.preview_class.to_s == identifier.to_s }
        elsif identifier.is_a?(String) || identifier.is_a?(Symbol)
          store.find { [_1.id, _1.uuid].include?(identifier.to_s) }
        else
          raise ArgumentError, "Invalid preview identifier"
        end
      end

      def tree
        @tree ||= begin
          debug("previews: building tree")
          EntityTree.new(inspector_targets)
        end
      end

      def to_data(format: "list")
        raise ArgumentError, "Invalid format '#{format}'" unless ["list", "tree"].include?(format)

        (format == "tree") ? tree.to_data : store.to_data
      end

      def to_json(...)
        Utils.deep_camelize_keys(to_data(...))
      end

      def reloader
        Reloader.new(:previews, watch_paths, watch_extensions) do |changes|
          changes.nil? ? load : update(changes)
        end
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
        Lookbook.config.preview_controller.constantize
      end

      def scenario_template
        "lookbook/previews/scenario"
      end

      def system_templates
        ["view_components/preview", scenario_template]
      end

      def parser
        @parser ||= PreviewsParser.new(preview_paths, source_parser)
      end

      def inspector_targets
        @inspector_targets ||= Previews.all.flat_map { _1.inspector_targets }
      end

      def directories = @directories ||= PreviewDirectories.new

      def statuses
        @statuses ||= Lookbook.config.preview_statuses.map do |name, props|
          Status.new(name, **props)
        end
      end

      private

      def clear_cache
        if @inspector_targets || @directories || @tree
          debug("previews: clearing cache")

          @inspector_targets = nil
          @directories = nil
          @tree = nil
        end
      end

      def update(changes)
        debug("previews: updating previews...")

        # Remove deleted or updated previews from the store
        tainted_paths = [changes.removed, changes.modified].flatten
        tainted_entities = tainted_paths.map do |path|
          store.find { _1.file_path.to_s == path }
        end
        store.remove(*tainted_entities.compact)

        # Parse modified or newly added preview files and add into store
        parser_paths = [changes.modified, changes.added].flatten
        parser.parse(parser_paths) do |preview_entities|
          store.add(*preview_entities)
          clear_cache

          debug("previews: #{changes.removed.size} removed, #{changes.modified.size} updated, #{changes.added.size} added")
        end
      end

      def store
        @store ||= EntityStore.new
      end

      def source_parser
        @source_parser ||= SourceParser.new(tags: Lookbook.config.preview_tags)
      end
    end
  end
end
