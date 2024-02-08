module Lookbook
  class PreviewEntity < Entity
    delegate_missing_to :code_object

    attr_reader :code_object, :preview_class

    def initialize(code_object, preview_class)
      @code_object = code_object
      @preview_class = preview_class
    end

    def id
      @id ||= Utils.hash(class_name)
    end

    def class_name
      code_object.path
    end

    def lookup_path
      class_name.underscore.gsub("_component", "").gsub("_preview", "")
    end

    def exist?
      File.exist?(class_file_path)
    end

    def class_file_path
      Pathname(code_object.file)
    end
  end
end
