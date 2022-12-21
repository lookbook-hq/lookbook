module Lookbook
  # Represents a preview class
  #
  # @ignore methods
  # @api public
  class PreviewEntity < Entity
    include AnnotatableEntity
    include LocatableEntity
    include NavigableEntity

    delegate :render_args, to: :preview_class

    attr_reader :preview_class

    def initialize(code_object)
      @code_object = code_object
      @preview_class = code_object.path.constantize
      @file_path = Pathname(code_object.file)
      @base_directories = Engine.preview_paths

      cleaned_path = relative_file_path.to_s
        .gsub(/\/(component_preview|preview)(\..*)$/, "")
        .gsub(/(_component_preview|_preview)(\..*)$/, "")

      @lookup_path = PathUtils.to_lookup_path(cleaned_path)
    end

    def examples
      @_examples ||= PreviewExampleCollection.new(load_examples)
    end

    def example(example_name)
      examples.find { |m| m.name == example_name.to_s }
    end

    def visible_examples
      @_visible_examples ||= PreviewExampleCollection.new(examples.select(&:visible?))
    end

    def default_example
      visible_examples.first
    end

    def components
      @_components ||= ComponentCollection.new(examples.flat_map(&:components).uniq(&:path))
    end

    def component
      components.first
    end

    def display_options
      global_options = Lookbook.config.preview_display_options
      global_options.deep_merge(fetch_config(:display_options, {}))
    end

    def layout
      preview_class.instance_variable_get(:@layout)
    end

    def url_path
      lookbook_inspect_path(path)
    end

    def preview_class_name
      preview_class.name
    end

    def render_type
      fetch_config(:type) { Lookbook.config.preview_type_default.to_sym }
    end

    def guess_components
      [preview_class.name.chomp("Preview").constantize]
    rescue
      []
    end

    protected

    def load_examples
      return example_entities unless code_object.groups.any?

      example_entities.group_by(&:group).flat_map do |group_name, grouped_examples|
        group_name.nil? ? grouped_examples : PreviewGroupEntity.new(group_name.presence || label.pluralize, grouped_examples, self)
      end
    end

    def example_entities
      public_methods = preview_class.public_instance_methods(false)
      method_objects = code_object.meths.select { |m| public_methods.include?(m.name) }
      method_objects.map.with_index { |code_object, i| PreviewExampleEntity.new(code_object, self, priority: i) }
    end
  end
end
