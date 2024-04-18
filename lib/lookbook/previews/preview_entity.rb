module Lookbook
  class PreviewEntity < Entity
    attr_reader :preview_class, :preview_file_path, :preview_class_name, :preview_methods, :metadata

    delegate :notes, :notes?, to: :metadata

    def initialize(code_object, preview_class)
      @preview_class = preview_class
      @preview_file_path = Pathname(code_object.file)
      @preview_class_name = code_object.path
      @preview_methods = code_object.meths
      @metadata = PreviewMetadata.new(code_object)
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def label
      metadata.fetch(:label, super)
    end

    def hidden?
      metadata.fetch(:hidden, super)
    end

    def priority
      metadata.fetch(:priority, super)
    end

    def url_param
      case Lookbook.config.preview_url_param.to_sym
      when :name
        name
      when :uuid
        uuid
      when :named_uuid
        "#{name}_#{uuid}"
      else
        name
      end
    end

    def lookup_path
      preview_class_name.underscore.downcase.gsub("_component", "").gsub("_preview", "")
    end

    def lookup_directory_path
      @lookup_directory_path ||= File.dirname(lookup_path).delete_prefix(".")
    end

    def url_path
      show_preview_path(self)
    end

    def layout
      if mailer_preview?
        "layouts/lookbook/mailer_preview"
      else
        preview_class.instance_variable_get(:@layout)
      end
    end

    def scenarios
      @scenarios ||= begin
        public_methods = preview_class.public_instance_methods(false)
        method_objects = preview_methods.select { |m| public_methods.include?(m.name) }
        scenarios = method_objects.map.with_index(1) do |code_object, i|
          ScenarioEntity.new(code_object, self, default_priority: i)
        end

        scenarios.sort!
      end
    end

    def mailer_preview?
      preview_class.ancestors.include?(::ActionMailer::Preview)
    end

    def preview_relative_file_path
      Pathname.new(preview_file_path).relative_path_from(Pathname.new(base_directory))
    end

    def preview_app_file_path
      Pathname.new(preview_file_path).relative_path_from(Rails.application.root)
    end

    private

    def base_directories
      Previews.preview_paths
    end

    def base_directory
      @base_directory ||= begin
        directories = Array(base_directories).map(&:to_s).sort_by { |path| path.split("/").size }.reverse
        directories.find { |dir| preview_file_path.to_s.start_with?(dir) }
      end
    end
  end
end
