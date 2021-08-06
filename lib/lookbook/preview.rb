module Lookbook
  module Preview

    def hidden?
      hidden_tag = class_object.tags(:hidden).first
      hidden_tag.present? && hidden_tag.text.strip != "false"
    end

    def get_example(example_name)
      Lookbook::PreviewExample.new(example_name, method_object(example_name))
    end

    def get_examples
      @examples_data ||= class_object.meths.map { |m| get_example(m.name.to_s) }
    end

    def get_visible_examples
      get_examples.reject(&:hidden?)
    end
    
    def label
      normalized_name.split("/").last.titleize.strip
    end

    def pretty_path
      path_parts.map(&:titleize).join("/")
    end

    def full_path
      base_path = Array(preview_paths).detect do |preview_path|
        Dir["#{preview_path}/#{preview_name}_preview.rb"].first
      end
      Pathname.new(Dir["#{base_path}/#{preview_name}_preview.rb"].first)
    end

    def path_parts
      parts = normalized_name.split("/")
      parts.first parts.size - 1
    end

    def normalized_name
      name.chomp("ComponentPreview").chomp("::").underscore
    end

    private

    def class_object
      @class_object ||= Lookbook::Parser.get_code_object(full_path, name)
    end

    def method_object(method_name)
      class_object.meths.find { |m| m.name.to_s == method_name }
    end

  end
end
