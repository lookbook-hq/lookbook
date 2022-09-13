module Lookbook
  class Preview < Collection
    include Utils

    delegate :name, :render_args, to: :@preview
    delegate :position, :group, :notes, :hidden?, :tags, :tag, to: :@preview_inspector

    def initialize(preview, code_object)
      @preview = preview
      @preview_inspector = SourceInspector.new(code_object)
      super(preview_class_path(@preview.name))
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
      public_method_objects = @preview_inspector&.methods&.select { |m| public_methods.include?(m.name) }
      examples = (public_method_objects || []).map { |m| PreviewExample.new(m.name.to_s, self, m) }
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
      @examples = @examples.compact
    end

    def items
      examples.reject { |i| i.hidden? }
    end

    def default_example
      examples.first
    end

    def rel_path
      "#{name.underscore}.rb"
    end

    def full_path
      base_path = Array(Lookbook.config.preview_paths).detect do |preview_path|
        Dir["#{preview_path}/#{rel_path}"].first
      end
      Pathname.new(Dir["#{base_path}/#{rel_path}"].first)
    end

    def url_path
      lookbook_inspect_path lookup_path
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

    def collapsible?
      true
    end

    def component
      components.first
    end

    def components
      component_classes = @preview_inspector&.components&.any? ? @preview_inspector&.components : [guess_component]
      component_classes.map do |class_name|
        Component.new(class_name.to_s)
      end
    end

    protected

    @preview_objects = nil
    @previews = nil

    def guess_component
      name.chomp("Preview").constantize
    rescue
      nil
    end

    class << self
      def find(path)
        all.find { |p| p.lookup_path == path }
      end

      def exists?(path)
        !!find(path)
      end

      def any?
        all.any?
      end

      def all
        if @previews.nil? && @preview_objects.present?
          previews = @preview_objects.map do |code_object|
            klass = code_object.path.constantize
            new(klass, code_object) if klass.ancestors.include?(ViewComponent::Preview)
          rescue => exception
            Lookbook.logger.error Lookbook::Error.new(exception)
            nil
          end.compact

          sorted_previews = previews.compact.sort_by { |preview| [preview.position, preview.label] }
          @previews = PreviewCollection.new(sorted_previews)
        else
          PreviewCollection.new([])
        end
        @previews
      end

      def errors
        @errors ||= []
      end

      def load!(preview_objects)
        @preview_objects = preview_objects
        @previews = nil
      end
    end

    alias_method :lookup_path, :path
  end
end
