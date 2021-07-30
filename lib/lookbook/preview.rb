module Lookbook
  module Preview

    def hidden?
      hidden_tag = Lookbook::Engine.parser.tags_for(name).first
      hidden_tag.present? && hidden_tag.text.strip != "false"
    end

    def get_example(example_name)
      Lookbook::PreviewExample.new(example_name, name)
    end

    def get_examples
      @examples_data ||= public_instance_methods(false).map { |name| get_example(name.to_s) }
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

  end
end
