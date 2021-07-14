module Lookbook
  module Preview

    def example(example_name)
      Lookbook::PreviewExample.new(example_name, method_info(example_name))
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

    def unsorted_examples
      public_instance_methods(false).map(&:to_s)
    end

    private

    def method_info(method_name)
      yard_path = "#{name}##{method_name}"
      if YARD::Registry.at(yard_path).nil?
        YARD.parse(full_path.to_s)
      end
      YARD::Registry.at(yard_path)
    end

  end
end
