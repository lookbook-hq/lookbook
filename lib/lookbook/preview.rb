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
      examples = (public_method_objects || []).map { |m| PreviewExample.new(m.name.to_s, self) }
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
      ViewComponent::Base.preview_paths
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
      def find(path)
        all.find { |p| p.lookup_path == path }
      end

      def exists?(path)
        !!find(path)
      end

      def all
        previews = load_previews.map do |p|
          new(p)
        rescue
          Rails.logger.error "[lookbook] error instantiating preview\n#{exception.full_message}"
        end

        sorted_previews = previews.compact.sort_by { |preview| [preview.position, preview.label] }
        PreviewCollection.new(sorted_previews)
      end

      def errors
        @errors || []
      end

      def reload
        load_previews
      end

      protected

      def reset_files_data
        @loaded_files = []
        @errors = []
      end

      def load_previews
        reset_files_data if @loaded_files.nil?
        require_preview_files if @errors.any?

        preview_classes = ViewComponent::Preview.descendants
        if preview_files.size > preview_classes.size
          require_preview_files
        end

        ViewComponent::Preview.descendants.filter { |klass| @loaded_files.include? "#{klass.name.underscore}.rb" }
      end

      def require_preview_files
        reset_files_data
        preview_files.each do |file|
          require_dependency(file[:path])
          @loaded_files.push(file[:rel_path])
        rescue => exception
          Rails.logger.error "[lookbook] preview error\n#{exception.full_message}\n"
          @errors.push(Lookbook::Error.new(exception, {
            title: "Preview #{exception.class}",
            file_name: file[:rel_path],
            file_path: file[:path]
          }))
        end
      end

      def preview_files
        files = Array(Lookbook.config.preview_paths).map do |preview_path|
          Dir["#{preview_path}/**/*_preview.rb"].map do |path|
            {
              path: path,
              base_path: preview_path,
              rel_path: Pathname(path).relative_path_from(preview_path).to_s
            }
          end
        end
        files.flatten
      end
    end

    alias_method :lookup_path, :path
  end
end
