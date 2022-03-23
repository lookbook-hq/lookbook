module Lookbook
  class Preview
    include Utils

    delegate :name, :render_args, to: :@preview
    delegate :position, :group, :notes, :hidden?, to: :@preview_inspector

    def initialize(preview)
      @preview = preview
      @preview_inspector = CodeInspector.new(@preview.name)
    end

    def id
      @preview_inspector&.id || generate_id(lookup_path)
    end

    def preview_class
      @preview.name
    end

    def label
      @preview_inspector&.label&.presence || lookup_path.split("/").last.titleize
    end

    def type
      :preview
    end

    def example(example_name)
      examples.find { |m| m.name == example_name.to_s }
    end

    def examples
      return @examples if @examples.present?
      public_methods = @preview.public_instance_methods(false)
      public_method_objects = @preview_inspector&.methods&.filter { |m| public_methods.include?(m.name) }
      examples = public_method_objects&.map { |m| PreviewExample.new(m.name.to_s, self) }
      sorted = Lookbook.config.sort_examples ? examples.sort_by(&:label) : examples
      @examples = []
      if @preview_inspector&.groups&.any?
        sorted.group_by { |m| m.group }.each do |name, examples|
          if name.nil?
            @examples += examples
          else
            name = label if name.strip == ""
            @examples << PreviewGroup.new(name.underscore, self, examples)
          end
        end
      else
        @examples = sorted
      end
      @examples
    end

    def default_example
      examples.first
    end

    def path
      preview_class_name(preview_class_basename(name))
    end

    def full_path
      base_path = Array(preview_paths).detect do |preview_path|
        Dir["#{preview_path}/#{name.underscore}.rb"].first
      end
      Pathname.new(Dir["#{base_path}/#{name.underscore}.rb"].first)
    end

    def preview_paths
      ViewComponent::Preview.preview_paths
    end

    def parent_collections_names
      File.dirname(path).split("/")
    end

    def hierarchy_depth
      path.split("/").size
    end

    def layout
      @preview.instance_variable_get(:@layout)
    end

    def display_params
      Lookbook.config.preview_display_params.deep_merge(@preview_inspector&.display_params)
    end

    class << self
      def all
        previews = ViewComponent::Preview.all.map { |p| new(p) }

        sorted_previews = previews.sort_by { |preview| [preview.position, preview.label] }
        PreviewCollection.new(sorted_previews)
      end

      def find(path)
        all.find { |p| p.lookup_path == path }
      end

      def exists?(path)
        !!find(path)
      end
    end

    alias_method :lookup_path, :path
  end
end
