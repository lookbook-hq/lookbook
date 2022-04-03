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
        load_previews if preview_files.size > ViewComponent::Preview.descendants.size

        previews = ViewComponent::Preview.descendants.map do |p|
          new(p)
        rescue
          Rails.logger.error "[lookbook] error instantiating preview\n#{exception.full_message}"
        end

        if errors.any?
          errors.each do |error|
            Rails.logger.error "[lookbook] preview error\n#{error.full_message}\n"
          end
        end

        sorted_previews = previews.compact.sort_by { |preview| [preview.position, preview.label] }
        PreviewCollection.new(sorted_previews)
      end

      def errors
        @errors ||= []
      end

      protected

      def load_previews
        @errors = []
        preview_files.each do |file|
          require_dependency file[:path]
        rescue SyntaxError, StandardError => exception
          @errors.push(
            Lookbook::Error.new(exception,
              title: "Preview #{exception.class}",
              file_name: file[:rel_path],
              file_path: file[:path])
          )
        end
      end

      def preview_files
        files = Array(Lookbook.config.preview_paths).map do |preview_path|
          Dir["#{preview_path}/**/*preview.rb"].map do |path|
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
