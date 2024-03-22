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
      metadata.label || super
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
      preview_class.instance_variable_get(:@layout)
    end

    def scenarios
      @scenarios ||= begin
        public_methods = preview_class.public_instance_methods(false)
        method_objects = preview_methods.select { |m| public_methods.include?(m.name) }
        method_objects.map.with_index do |code_object, i|
          ScenarioEntity.new(code_object, self, default_priority: i)
        end
      end
    end
  end
end
